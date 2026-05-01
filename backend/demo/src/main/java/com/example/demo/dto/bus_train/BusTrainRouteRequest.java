package com.example.demo.dto.bus_train;

import com.example.demo.document.embed.Seat;
import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusTrainRouteRequest {
    @NotBlank(message = "Operator name is required")
    private String operatorName;

    @NotBlank(message = "Vehicle type is required (bus/train)")
    private String vehicleType;

    @NotBlank(message = "Departure city is required")
    private String departureCity;

    @NotBlank(message = "Arrival city is required")
    private String arrivalCity;

    @NotNull(message = "Departure time is required")
    private Date departureTime;
    
    private Date arrivalTime;

    @NotNull(message = "Price is required")
    private Double price;
    
    private String vehicleClass;
    
    @NotNull(message = "Total seats is required")
    private Integer totalSeats;
    
    private List<Seat> seatMap;
    
    private Boolean isActive;
}
