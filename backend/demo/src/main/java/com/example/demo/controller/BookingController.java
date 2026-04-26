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

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/bookings/tour")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> createTourBooking(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody BookingRequest request) {
        BookingDTO booking = bookingService.createTourBooking(userDetails.getId(), request);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/my")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<Page<BookingDTO>> getMyBookings(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        
        String sortField = sort[0];
        Sort.Direction sortDirection = sort.length > 1 && sort[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        
        Page<BookingDTO> bookings = bookingService.getUserBookings(userDetails.getId(), pageable);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/admin/bookings/{id}/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> confirmBooking(@PathVariable String id) {
        BookingDTO booking = bookingService.confirmBooking(id);
        return ResponseEntity.ok(booking);
    }
}
