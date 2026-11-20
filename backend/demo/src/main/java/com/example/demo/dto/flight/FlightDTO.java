package com.example.demo.dto.flight;

import com.example.demo.document.embed.FlightSchedule;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightDTO {
    private String id;
    private String airline;
    private String flightNumber;
    private String departureAirport;
    private String arrivalAirport;
    private String departureCity;
    private String arrivalCity;
    private String departureAirportName;
    private String arrivalAirportName;
    private String imageUrl;
    private String cabinClass;
    private Double basePrice;
    private Integer durationMinutes;
    private Integer totalSeats;
    private List<FlightSchedule> schedules;
    private Boolean isActive;
}
