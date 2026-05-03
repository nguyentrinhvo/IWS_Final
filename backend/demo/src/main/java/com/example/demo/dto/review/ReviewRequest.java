package com.example.demo.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequest {
    @NotBlank(message = "Service ID is required")
    private String serviceId;

    @NotBlank(message = "Service type is required")
    private String serviceType; // "tour" | "hotel" | "attraction" | "flight"

    @NotBlank(message = "Booking ID is required")
    private String bookingId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @NotBlank(message = "Content is required")
    private String content;

    private List<String> images;
}
