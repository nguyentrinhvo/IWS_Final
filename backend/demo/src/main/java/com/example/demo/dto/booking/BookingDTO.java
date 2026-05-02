package com.example.demo.dto.booking;

import com.example.demo.document.embed.PaymentEmbed;
import java.util.Date;
import java.util.Map;
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
public class BookingDTO {
    private String id;
    private String userId;
    private String serviceId;
    private String serviceType;
    private Integer numAdults;
    private Integer numChildren;
    private Integer quantity;
    private Date checkInDate;
    private Date checkOutDate;
    private Double totalPrice;
    private String status;
    private String note;
    private String snapshotName;
    private Double snapshotPrice;
    private Map<String, Object> snapshotDetail;
    private PaymentEmbed payment;
    private List<Passenger> passengers;
    private Date createdAt;
}
