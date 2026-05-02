package com.example.demo.dto.bus_train;

import com.example.demo.document.embed.Seat;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusTrainRouteDTO {
    private String id;
    private String operatorName;
    private String vehicleType;
    private String departureCity;
    private String arrivalCity;
    private Date departureTime;
    private Date arrivalTime;
    private Double price;
    private String vehicleClass;
    private Integer totalSeats;
    private List<Seat> seatMap;
    private Boolean isActive;
}
