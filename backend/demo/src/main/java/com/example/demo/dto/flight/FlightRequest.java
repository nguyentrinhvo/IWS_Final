package com.example.demo.dto.flight;

import com.example.demo.document.embed.FlightSchedule;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightRequest {
    @NotBlank(message = "Airline is required")
    private String airline;

    @NotBlank(message = "Flight number is required")
    private String flightNumber;

    @NotBlank(message = "Departure airport is required")
    private String departureAirport;

    @NotBlank(message = "Arrival airport is required")
    private String arrivalAirport;

    @NotBlank(message = "Cabin class is required")
    private String cabinClass;

    @NotNull(message = "Base price is required")
    private Double basePrice;

    @NotNull(message = "Duration in minutes is required")
    private Integer durationMinutes;

    @NotNull(message = "Total seats is required")
    private Integer totalSeats;

    private List<FlightSchedule> schedules;
    
    private Boolean isActive;
}
