package com.example.demo.dto.attraction;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request body for purchasing attraction tickets.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketPurchaseRequest {

    @NotBlank(message = "Attraction ID is required")
    private String attractionId;

    @NotBlank(message = "Ticket type name is required")
    private String ticketTypeName;  // e.g. "Single", "Combo", "VIP"

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "At least 1 ticket required")
    private Integer quantity;

    private String note;

    @NotBlank(message = "Payment provider is required")
    private String paymentProvider; // "vnpay" | "paypal"
}
