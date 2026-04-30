package com.example.demo.service;

import com.example.demo.document.BookingDocument;
import com.example.demo.document.ReviewDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.dto.review.ReviewDTO;
import com.example.demo.dto.review.ReviewRequest;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.repository.UserRepository;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TourRepository tourRepository;

    public ReviewDTO createReview(String userId, ReviewRequest request) {
        BookingDocument booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new BadRequestException("You can only review your own bookings");
        }
        
        if (!booking.getStatus().equals("confirmed")) {
            throw new BadRequestException("You can only review confirmed bookings");
        }

        if (!booking.getServiceId().equals(request.getServiceId())) {
             throw new BadRequestException("Booking service ID does not match the request service ID");
        }

        if (reviewRepository.existsByUserIdAndBookingId(userId, request.getBookingId())) {
            throw new BadRequestException("You have already reviewed this booking");
        }

        UserDocument user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ReviewDocument review = ReviewDocument.builder()
                .serviceId(request.getServiceId())
                .serviceType(request.getServiceType())
                .userId(userId)
                .bookingId(request.getBookingId())
                .rating(request.getRating())
                .content(request.getContent())
                .images(request.getImages())
                .isHidden(false)
                .snapshotUserName(user.getFullName() != null ? user.getFullName() : user.getEmail())
                .snapshotAvatarUrl(user.getAvatarUrl())
                .createdAt(new Date())
                .build();

        ReviewDocument savedReview = reviewRepository.save(review);

        // Update total reviews and avg rating for tours
        if ("tour".equals(request.getServiceType())) {
            tourRepository.findById(request.getServiceId()).ifPresent(tour -> {
                int totalReviews = tour.getTotalReviews() != null ? tour.getTotalReviews() : 0;
                double avgRating = tour.getAvgRating() != null ? tour.getAvgRating() : 0.0;
                
                double newAvgRating = ((avgRating * totalReviews) + request.getRating()) / (totalReviews + 1);
                
                tour.setTotalReviews(totalReviews + 1);
                tour.setAvgRating(newAvgRating);
                tourRepository.save(tour);
            });
        }

        return mapToDTO(savedReview);
    }

    public Page<ReviewDTO> getServiceReviews(String serviceId, String serviceType, Pageable pageable) {
        Page<ReviewDocument> reviews = reviewRepository.findByServiceIdAndServiceTypeAndIsHiddenFalse(serviceId, serviceType, pageable);
        return reviews.map(this::mapToDTO);
    }

    public ReviewDTO hideReview(String id) {
        ReviewDocument review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        review.setIsHidden(true);
        ReviewDocument updatedReview = reviewRepository.save(review);
        return mapToDTO(updatedReview);
    }

    private ReviewDTO mapToDTO(ReviewDocument review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setServiceId(review.getServiceId());
        dto.setServiceType(review.getServiceType());
        dto.setUserId(review.getUserId());
        dto.setBookingId(review.getBookingId());
        dto.setRating(review.getRating());
        dto.setContent(review.getContent());
        dto.setImages(review.getImages());
        dto.setIsHidden(review.getIsHidden());
        dto.setSnapshotUserName(review.getSnapshotUserName());
        dto.setSnapshotAvatarUrl(review.getSnapshotAvatarUrl());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
