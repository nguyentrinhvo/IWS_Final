package com.example.demo.document;

import com.example.demo.document.embed.PaymentEmbed;
import java.util.Date;
import java.util.Map;
import java.util.List;
import com.example.demo.document.embed.Passenger;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookings")
@CompoundIndex(name = "idx_booking_type_status", def = "{'serviceType': 1, 'status': 1}")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDocument {
    @Id
    private String id;

    @Indexed
    private String userId;
    private String serviceId;

    @Indexed
    private String serviceType;       // "tour" | "flight" | "hotel" | "bus_train" | "attraction"

    private Integer numAdults;
    private Integer numChildren;
    private Integer quantity;
    private Date checkInDate;
    private Date checkOutDate;

    @Indexed
    private Double totalPrice;

    @Indexed
    private String status;            // "pending" | "confirmed" | "rejected" | "cancelled"
    private String note;

    // SNAPSHOT
    private String snapshotName;
    private Double snapshotPrice;
    private Map<String, Object> snapshotDetail;

    // EMBEDDED
    private PaymentEmbed payment;
    private List<Passenger> passengers;

    @Indexed
    private Date createdAt;
}
