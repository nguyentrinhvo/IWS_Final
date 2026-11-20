package com.example.demo.controller;

import com.example.demo.document.BookingDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.dto.admin.DashboardStatsDTO;
import com.example.demo.dto.booking.BookingDTO;
import com.example.demo.dto.user.UserDTO;
import com.example.demo.service.AdminService;
import com.example.demo.service.BookingService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/bookings")
    public ResponseEntity<Page<BookingDTO>> getAllBookings(
            @RequestParam(required = false) String serviceType,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return ResponseEntity.ok(bookingService.getAllBookings(serviceType, status, pageable));
    }

    @PutMapping("/bookings/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable String id) {
        bookingService.updateBookingStatus(id, "confirmed");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return ResponseEntity.ok(userService.getAllUsers(keyword, pageable));
    }

    @PutMapping("/users/{id}/lock")
    public ResponseEntity<?> toggleLockUser(@PathVariable String id) {
        userService.toggleLockUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> createUser(@jakarta.validation.Valid @RequestBody com.example.demo.dto.admin.CreateUserRequest request) {
        return ResponseEntity.ok(userService.adminCreateUser(request));
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> changeUserRole(@PathVariable String id, @RequestParam String role) {
        return ResponseEntity.ok(userService.changeUserRole(id, role));
    }
}
