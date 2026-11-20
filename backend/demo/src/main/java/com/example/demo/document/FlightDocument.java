package com.example.demo.document;

import com.example.demo.document.embed.FlightSchedule;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flights")
@CompoundIndex(name = "idx_flight_route", def = "{'departureAirport': 1, 'arrivalAirport': 1}")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightDocument {
    @Id
    private String id;

    @Indexed
    private String airline;
    private String flightNumber;

    @Indexed
    private String departureAirport;

    @Indexed
    private String arrivalAirport;
    
    private String departureCity;
    private String arrivalCity;
    private String departureAirportName;
    private String arrivalAirportName;
    
    private String imageUrl;

    @Indexed
    private String cabinClass;       // "economy" | "business" | "first"

    @Indexed
    private Double basePrice;
    private Integer durationMinutes;
    private Integer totalSeats;

    // EMBEDDED
    private List<FlightSchedule> schedules;

    private Boolean isActive;
}
