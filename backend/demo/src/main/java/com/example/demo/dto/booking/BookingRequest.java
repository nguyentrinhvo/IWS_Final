package com.example.demo.dto.booking;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import com.example.demo.document.embed.Passenger;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    @NotBlank(message = "Service ID is required")
    private String serviceId;

    @NotNull(message = "Number of adults is required")
    @Min(value = 1, message = "At least 1 adult is required")
    private Integer numAdults;

    private Integer numChildren;
    private String note;
    private List<Passenger> passengers;
    
    @NotBlank(message = "Payment provider is required")
    private String paymentProvider; // e.g., "vnpay", "paypal", "cash"
}
