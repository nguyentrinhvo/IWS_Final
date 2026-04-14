package com.example.demo.document;

import com.example.demo.document.embed.Seat;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "busTrainRoutes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusTrainRouteDocument {
    @Id
    private String id;

    @Indexed
    private String operatorName;

    @Indexed
    private String vehicleType;        // "bus" | "train"

    @Indexed
    private String departureCity;

    @Indexed
    private String arrivalCity;

    @Indexed
    private Date departureTime;
    private Date arrivalTime;

    @Indexed
    private Double price;
    private String vehicleClass;
    private Integer totalSeats;

    // EMBEDDED
    private List<Seat> seatMap;

    private Boolean isActive;
}
