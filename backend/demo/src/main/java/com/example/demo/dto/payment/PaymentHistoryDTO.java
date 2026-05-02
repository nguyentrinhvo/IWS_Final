package com.example.demo.dto.payment;

import com.example.demo.document.BookingDocument;
import com.example.demo.document.embed.PaymentEmbed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * DTO for admin payment transaction history view.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentHistoryDTO {
    private String bookingId;
    private String userId;
    private String serviceType;
    private String snapshotName;
    private Double totalPrice;
    private String bookingStatus;

    // Payment details
    private String paymentProvider;
    private String paymentStatus;
    private String transactionId;
    private Date paidAt;
    private Date createdAt;

    public static PaymentHistoryDTO from(BookingDocument booking) {
        PaymentEmbed payment = booking.getPayment();
        return PaymentHistoryDTO.builder()
                .bookingId(booking.getId())
                .userId(booking.getUserId())
                .serviceType(booking.getServiceType())
                .snapshotName(booking.getSnapshotName())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getStatus())
                .paymentProvider(payment != null ? payment.getProvider() : null)
                .paymentStatus(payment != null ? payment.getPaymentStatus() : null)
                .transactionId(payment != null ? payment.getTransactionId() : null)
                .paidAt(payment != null ? payment.getPaidAt() : null)
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
