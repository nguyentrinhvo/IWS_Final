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

    public Page<BookingDTO> getUserBookings(String userId, Pageable pageable) {
        Page<BookingDocument> bookings = bookingRepository.findByUserId(userId, pageable);
        return bookings.map(this::mapToDTO);
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
}
