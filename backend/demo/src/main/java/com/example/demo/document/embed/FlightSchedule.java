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
    private String departureTime;    // "06:30"
    private String arrivalTime;      // "08:45"
    private Integer availableSeats;
    private Date flightDate;
}
