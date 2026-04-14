package com.example.demo.document.embed;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentEmbed {
    private String provider;          // "vnpay" | "paypal"
    private String paymentStatus;     // "pending" | "success" | "failed" | "refunded"
    private String transactionId;
    private Date paidAt;
}
