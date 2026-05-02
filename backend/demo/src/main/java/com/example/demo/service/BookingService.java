package com.example.demo.service;

import com.example.demo.document.BookingDocument;
import com.example.demo.document.TourDocument;
import com.example.demo.document.embed.PaymentEmbed;
import com.example.demo.dto.booking.BookingDTO;
import com.example.demo.dto.booking.BookingRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.TourRepository;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository;

    public BookingDTO createTourBooking(String userId, BookingRequest request) {
        TourDocument tour = tourRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
        
        if (tour.getIsDeleted() != null && tour.getIsDeleted()) {
            throw new ResourceNotFoundException("Tour not found");
        }

        int adults = request.getNumAdults() != null ? request.getNumAdults() : 1;
        int children = request.getNumChildren() != null ? request.getNumChildren() : 0;

        double priceAdult = tour.getPriceAdult() != null ? tour.getPriceAdult() : 0.0;
        double priceChild = tour.getPriceChild() != null ? tour.getPriceChild() : 0.0;
        
        double totalPrice = (adults * priceAdult) + (children * priceChild);

        Map<String, Object> snapshotDetail = new HashMap<>();
        snapshotDetail.put("tourId", tour.getId());
        snapshotDetail.put("durationDays", tour.getDurationDays());
        snapshotDetail.put("destination", tour.getDestination());
        snapshotDetail.put("tourType", tour.getTourType());

        PaymentEmbed payment = PaymentEmbed.builder()
                .provider(request.getPaymentProvider())
                .paymentStatus("pending")
                .build();

        BookingDocument booking = BookingDocument.builder()
                .userId(userId)
                .serviceId(request.getServiceId())
                .serviceType("tour")
                .numAdults(adults)
                .numChildren(children)
                .totalPrice(totalPrice)
                .status("pending")
                .note(request.getNote())
                .snapshotName(tour.getNameVi()) // Defaulting to Vi name
                .snapshotPrice(priceAdult) // Base adult price
                .snapshotDetail(snapshotDetail)
                .payment(payment)
                .passengers(request.getPassengers())
                .createdAt(new Date())
                .build();

        BookingDocument savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    public Page<BookingDTO> getUserBookings(String userId, String serviceType, String status, Pageable pageable) {
        Page<BookingDocument> bookings;
        if (serviceType != null && status != null) {
            bookings = bookingRepository.findByUserIdAndServiceTypeAndStatus(userId, serviceType, status, pageable);
        } else if (serviceType != null) {
            bookings = bookingRepository.findByUserIdAndServiceType(userId, serviceType, pageable);
        } else if (status != null) {
            bookings = bookingRepository.findByUserIdAndStatus(userId, status, pageable);
        } else {
            bookings = bookingRepository.findByUserId(userId, pageable);
        }
        return bookings.map(this::mapToDTO);
    }

    public BookingDTO getBookingById(String id, String userId) {
        BookingDocument booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        // Admin or the owner can view
        if (userId != null && !booking.getUserId().equals(userId)) {
            throw new com.example.demo.exception.BadRequestException("Cannot view others booking");
        }
        
        return mapToDTO(booking);
    }

    public BookingDTO confirmBooking(String id) {
        BookingDocument booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        booking.setStatus("confirmed");
        
        if (booking.getPayment() != null) {
            booking.getPayment().setPaymentStatus("success");
            booking.getPayment().setPaidAt(new Date());
        }
        
        BookingDocument updatedBooking = bookingRepository.save(booking);
        return mapToDTO(updatedBooking);
    }

    public BookingDTO cancelBooking(String id, String userId) {
        BookingDocument booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        // Ensure only the user or admin can cancel it
        if (!booking.getUserId().equals(userId)) {
            // In a real app we would check roles, for now we assume check is done via controller/security
            throw new com.example.demo.exception.BadRequestException("Cannot cancel others booking");
        }
        
        if (booking.getStatus().equals("cancelled")) {
            throw new com.example.demo.exception.BadRequestException("Booking is already cancelled");
        }

        booking.setStatus("cancelled");
        BookingDocument updatedBooking = bookingRepository.save(booking);

        // Refund seats logic for flights could be added here
        if ("flight".equals(booking.getServiceType()) && booking.getServiceId() != null) {
             flightRepository.findById(booking.getServiceId()).ifPresent(flight -> {
                 if (flight.getSchedules() != null && !flight.getSchedules().isEmpty()) {
                     com.example.demo.document.embed.FlightSchedule schedule = flight.getSchedules().get(0);
                     int numPassengers = (booking.getNumAdults() != null ? booking.getNumAdults() : 1) 
                                       + (booking.getNumChildren() != null ? booking.getNumChildren() : 0);
                     schedule.setAvailableSeats(schedule.getAvailableSeats() + numPassengers);
                     flightRepository.save(flight);
                 }
             });
        }
        
        // Refund seats logic for bus_train
        if ("bus_train".equals(booking.getServiceType()) && booking.getServiceId() != null) {
            busTrainRouteRepository.findById(booking.getServiceId()).ifPresent(route -> {
                if (route.getSeatMap() != null) {
                    // This is a simplified cancel logic. Ideally, we should know which seats were booked.
                    // If passengers are provided and contain seat numbers, we could free those exact seats.
                    if (booking.getPassengers() != null && !booking.getPassengers().isEmpty()) {
                        for (com.example.demo.document.embed.Passenger p : booking.getPassengers()) {
                            if (p.getSeatPosition() != null) {
                                route.getSeatMap().stream()
                                    .filter(s -> p.getSeatPosition().equals(s.getPosition()))
                                    .findFirst()
                                    .ifPresent(s -> s.setStatus("available"));
                            }
                        }
                        busTrainRouteRepository.save(route);
                    }
                }
            });
        }

        // Refund rooms logic for hotels
        if ("hotel".equals(booking.getServiceType()) && booking.getServiceId() != null) {
            hotelRepository.findById(booking.getServiceId()).ifPresent(hotel -> {
                if (hotel.getRoomTypes() != null && booking.getSnapshotDetail() != null) {
                    String roomTypeName = (String) booking.getSnapshotDetail().get("roomTypeName");
                    if (roomTypeName != null) {
                        hotel.getRoomTypes().stream()
                            .filter(r -> r.getTypeName().equals(roomTypeName))
                            .findFirst()
                            .ifPresent(r -> {
                                int q = booking.getQuantity() != null ? booking.getQuantity() : 1;
                                r.setAvailableRooms(r.getAvailableRooms() + q);
                            });
                        hotelRepository.save(hotel);
                    }
                }
            });
        }

        return mapToDTO(updatedBooking);
    }
    
    private BookingDTO mapToDTO(BookingDocument booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUserId());
        dto.setServiceId(booking.getServiceId());
        dto.setServiceType(booking.getServiceType());
        dto.setNumAdults(booking.getNumAdults());
        dto.setNumChildren(booking.getNumChildren());
        dto.setQuantity(booking.getQuantity());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setStatus(booking.getStatus());
        dto.setNote(booking.getNote());
        dto.setSnapshotName(booking.getSnapshotName());
        dto.setSnapshotPrice(booking.getSnapshotPrice());
        dto.setSnapshotDetail(booking.getSnapshotDetail());
        dto.setPayment(booking.getPayment());
        dto.setPassengers(booking.getPassengers());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }

    @Autowired
    private com.example.demo.repository.FlightRepository flightRepository;

    @Autowired
    private com.example.demo.repository.BusTrainRouteRepository busTrainRouteRepository;

    @Autowired
    private com.example.demo.repository.HotelRepository hotelRepository;

    public BookingDTO createFlightBooking(String userId, BookingRequest request) {
        com.example.demo.document.FlightDocument flight = flightRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        if (flight.getIsActive() != null && !flight.getIsActive()) {
            throw new ResourceNotFoundException("Flight is not active");
        }

        int numPassengers = (request.getNumAdults() != null ? request.getNumAdults() : 1) 
                          + (request.getNumChildren() != null ? request.getNumChildren() : 0);

        // Find the schedule to deduct seats (For simplicity we assume the first schedule or a matching one if flightDate was provided in request, but BookingRequest doesn't have flightDate for search. We'll deduct from the first schedule for demo)
        if (flight.getSchedules() != null && !flight.getSchedules().isEmpty()) {
            com.example.demo.document.embed.FlightSchedule schedule = flight.getSchedules().get(0);
            if (schedule.getAvailableSeats() < numPassengers) {
                throw new com.example.demo.exception.BadRequestException("Not enough available seats");
            }
            schedule.setAvailableSeats(schedule.getAvailableSeats() - numPassengers);
            flightRepository.save(flight);
        }

        double totalPrice = numPassengers * flight.getBasePrice();

        Map<String, Object> snapshotDetail = new HashMap<>();
        snapshotDetail.put("airline", flight.getAirline());
        snapshotDetail.put("flightNumber", flight.getFlightNumber());
        snapshotDetail.put("departureAirport", flight.getDepartureAirport());
        snapshotDetail.put("arrivalAirport", flight.getArrivalAirport());
        snapshotDetail.put("cabinClass", flight.getCabinClass());

        PaymentEmbed payment = PaymentEmbed.builder()
                .provider(request.getPaymentProvider())
                .paymentStatus("pending")
                .build();

        BookingDocument booking = BookingDocument.builder()
                .userId(userId)
                .serviceId(request.getServiceId())
                .serviceType("flight")
                .numAdults(request.getNumAdults() != null ? request.getNumAdults() : 1)
                .numChildren(request.getNumChildren() != null ? request.getNumChildren() : 0)
                .totalPrice(totalPrice)
                .status("pending")
                .note(request.getNote())
                .snapshotName(flight.getAirline() + " - " + flight.getFlightNumber())
                .snapshotPrice(flight.getBasePrice())
                .snapshotDetail(snapshotDetail)
                .payment(payment)
                .passengers(request.getPassengers())
                .createdAt(new Date())
                .build();

        BookingDocument savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    public BookingDTO createBusTrainBooking(String userId, BookingRequest request) {
        com.example.demo.document.BusTrainRouteDocument route = busTrainRouteRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus/Train route not found"));

        if (route.getIsActive() != null && !route.getIsActive()) {
            throw new ResourceNotFoundException("Bus/Train route is not active");
        }

        int numPassengers = (request.getNumAdults() != null ? request.getNumAdults() : 1) 
                          + (request.getNumChildren() != null ? request.getNumChildren() : 0);

        // Deduct seats if seat map exists and passengers specify seats
        if (route.getSeatMap() != null && request.getPassengers() != null && !request.getPassengers().isEmpty()) {
            for (com.example.demo.document.embed.Passenger p : request.getPassengers()) {
                if (p.getSeatPosition() != null) {
                    route.getSeatMap().stream()
                        .filter(s -> p.getSeatPosition().equals(s.getPosition()))
                        .findFirst()
                        .ifPresent(s -> {
                            if (!"available".equals(s.getStatus())) {
                                throw new com.example.demo.exception.BadRequestException("Seat " + s.getPosition() + " is already booked");
                            }
                            s.setStatus("booked");
                        });
                }
            }
            busTrainRouteRepository.save(route);
        }

        double totalPrice = numPassengers * route.getPrice();

        Map<String, Object> snapshotDetail = new HashMap<>();
        snapshotDetail.put("operatorName", route.getOperatorName());
        snapshotDetail.put("vehicleType", route.getVehicleType());
        snapshotDetail.put("departureCity", route.getDepartureCity());
        snapshotDetail.put("arrivalCity", route.getArrivalCity());
        snapshotDetail.put("vehicleClass", route.getVehicleClass());

        PaymentEmbed payment = PaymentEmbed.builder()
                .provider(request.getPaymentProvider())
                .paymentStatus("pending")
                .build();

        BookingDocument booking = BookingDocument.builder()
                .userId(userId)
                .serviceId(request.getServiceId())
                .serviceType("bus_train")
                .numAdults(request.getNumAdults() != null ? request.getNumAdults() : 1)
                .numChildren(request.getNumChildren() != null ? request.getNumChildren() : 0)
                .totalPrice(totalPrice)
                .status("pending")
                .note(request.getNote())
                .snapshotName(route.getOperatorName() + " - " + route.getDepartureCity() + " to " + route.getArrivalCity())
                .snapshotPrice(route.getPrice())
                .snapshotDetail(snapshotDetail)
                .payment(payment)
                .passengers(request.getPassengers())
                .createdAt(new Date())
                .build();

        BookingDocument savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    public BookingDTO createHotelBooking(String userId, BookingRequest request) {
        com.example.demo.document.HotelDocument hotel = hotelRepository.findById(request.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));

        if (hotel.getIsActive() != null && !hotel.getIsActive()) {
            throw new ResourceNotFoundException("Hotel is not active");
        }

        if (request.getRoomTypeName() == null) {
            throw new com.example.demo.exception.BadRequestException("Room type name is required for hotel booking");
        }

        com.example.demo.document.embed.RoomType selectedRoom = null;
        if (hotel.getRoomTypes() != null) {
            selectedRoom = hotel.getRoomTypes().stream()
                .filter(r -> r.getTypeName().equals(request.getRoomTypeName()))
                .findFirst()
                .orElse(null);
        }

        if (selectedRoom == null) {
            throw new ResourceNotFoundException("Room type not found in hotel");
        }

        int quantity = request.getQuantity() != null ? request.getQuantity() : 1;

        if (selectedRoom.getAvailableRooms() < quantity) {
            throw new com.example.demo.exception.BadRequestException("Not enough available rooms");
        }

        // Deduct available rooms
        selectedRoom.setAvailableRooms(selectedRoom.getAvailableRooms() - quantity);
        hotelRepository.save(hotel);

        // Calculate nights
        long nights = 1;
        if (request.getCheckInDate() != null && request.getCheckOutDate() != null) {
            long diff = request.getCheckOutDate().getTime() - request.getCheckInDate().getTime();
            nights = diff / (1000 * 60 * 60 * 24);
            if (nights <= 0) nights = 1;
        }

        double totalPrice = quantity * selectedRoom.getPricePerNight() * nights;

        Map<String, Object> snapshotDetail = new HashMap<>();
        snapshotDetail.put("hotelName", hotel.getName());
        snapshotDetail.put("address", hotel.getAddress());
        snapshotDetail.put("city", hotel.getCity());
        snapshotDetail.put("starRating", hotel.getStarRating());
        snapshotDetail.put("roomTypeName", selectedRoom.getTypeName());
        snapshotDetail.put("nights", nights);

        PaymentEmbed payment = PaymentEmbed.builder()
                .provider(request.getPaymentProvider())
                .paymentStatus("pending")
                .build();

        BookingDocument booking = BookingDocument.builder()
                .userId(userId)
                .serviceId(request.getServiceId())
                .serviceType("hotel")
                .numAdults(request.getNumAdults() != null ? request.getNumAdults() : 1)
                .numChildren(request.getNumChildren() != null ? request.getNumChildren() : 0)
                .quantity(quantity)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .totalPrice(totalPrice)
                .status("pending")
                .note(request.getNote())
                .snapshotName(hotel.getName() + " - " + selectedRoom.getTypeName())
                .snapshotPrice(selectedRoom.getPricePerNight())
                .snapshotDetail(snapshotDetail)
                .payment(payment)
                .passengers(request.getPassengers())
                .createdAt(new Date())
                .build();

        BookingDocument savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }
}
