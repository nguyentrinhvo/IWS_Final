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
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }
}
