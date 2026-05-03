package com.example.demo.controller;

import com.example.demo.dto.booking.BookingDTO;
import com.example.demo.dto.booking.BookingRequest;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private com.example.demo.service.PaymentService paymentService;

    @PostMapping("/bookings/tour")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> createTourBooking(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody BookingRequest request) {
        BookingDTO booking = bookingService.createTourBooking(userDetails.getId(), request);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @PostMapping("/bookings/flight")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> createFlightBooking(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody BookingRequest request) {
        BookingDTO booking = bookingService.createFlightBooking(userDetails.getId(), request);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @PostMapping("/bookings/bus-train")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> createBusTrainBooking(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody BookingRequest request) {
        BookingDTO booking = bookingService.createBusTrainBooking(userDetails.getId(), request);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @PostMapping("/bookings/hotel")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> createHotelBooking(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody BookingRequest request) {
        BookingDTO booking = bookingService.createHotelBooking(userDetails.getId(), request);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/my")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<Page<BookingDTO>> getMyBookings(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(required = false) String serviceType,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        
        String sortField = sort[0];
        Sort.Direction sortDirection = sort.length > 1 && sort[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        
        Page<BookingDTO> bookings = bookingService.getUserBookings(userDetails.getId(), serviceType, status, pageable);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> getBookingById(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        boolean isAdmin = userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        String targetUserId = isAdmin ? null : userDetails.getId();
        
        return ResponseEntity.ok(bookingService.getBookingById(id, targetUserId));
    }

    @PostMapping("/bookings/{id}/resend-ticket")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<Map<String, String>> resendTicket(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        BookingDTO booking = bookingService.getBookingById(id, userDetails.getId());
        
        if (!"success".equals(booking.getPayment().getPaymentStatus())) {
            throw new com.example.demo.exception.BadRequestException("Cannot send ticket for unpaid booking");
        }

        // Convert BookingDTO to BookingDocument to pass to PaymentService
        com.example.demo.document.BookingDocument doc = new com.example.demo.document.BookingDocument();
        doc.setId(booking.getId());
        doc.setUserId(booking.getUserId());
        doc.setSnapshotName(booking.getSnapshotName());
        doc.setTotalPrice(booking.getTotalPrice());
        doc.setServiceType(booking.getServiceType());
        doc.setSnapshotDetail(booking.getSnapshotDetail());
        doc.setQuantity(booking.getQuantity());

        if ("attraction".equals(booking.getServiceType())) {
            paymentService.sendETicketEmail(doc, booking.getPayment().getProvider(), booking.getPayment().getTransactionId());
        } else {
            paymentService.sendPaymentConfirmationEmail(doc, booking.getPayment().getProvider(), booking.getPayment().getTransactionId());
        }

        return ResponseEntity.ok(Map.of("message", "E-ticket has been sent to your email."));
    }


    @PutMapping("/bookings/{id}/cancel")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> cancelBooking(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        BookingDTO booking = bookingService.cancelBooking(id, userDetails.getId());
        return ResponseEntity.ok(booking);
    }
}
