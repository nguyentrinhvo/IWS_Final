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
public class FlightSchedule {
    private Date departureTime;
    private Date arrivalTime;
    private Integer availableSeats;
    private Date flightDate;
}
