package com.example.demo.controller;

import com.example.demo.dto.review.ReviewDTO;
import com.example.demo.dto.review.ReviewRequest;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.ReviewService;
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
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/reviews")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ReviewDTO> createReview(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody ReviewRequest request) {
        ReviewDTO review = reviewService.createReview(userDetails.getId(), request);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @GetMapping("/reviews")
    public ResponseEntity<Page<ReviewDTO>> getServiceReviews(
            @RequestParam String serviceId,
            @RequestParam String serviceType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        
        String sortField = sort[0];
        Sort.Direction sortDirection = sort.length > 1 && sort[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        
        Page<ReviewDTO> reviews = reviewService.getServiceReviews(serviceId, serviceType, pageable);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/admin/reviews/{id}/hide")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReviewDTO> hideReview(@PathVariable String id) {
        ReviewDTO review = reviewService.hideReview(id);
        return ResponseEntity.ok(review);
    }
}
