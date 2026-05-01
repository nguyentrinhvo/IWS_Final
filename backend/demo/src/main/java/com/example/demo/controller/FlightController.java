package com.example.demo.controller;

import com.example.demo.dto.flight.FlightDTO;
import com.example.demo.dto.flight.FlightRequest;
import com.example.demo.service.FlightService;
import jakarta.validation.Valid;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // PUBLIC: Search flights
    @GetMapping("/search")
    public ResponseEntity<List<FlightDTO>> searchFlights(
            @RequestParam String departureAirport,
            @RequestParam String arrivalAirport,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date flightDate,
            @RequestParam(required = false) String airline,
            @RequestParam(required = false) String cabinClass) {
        List<FlightDTO> flights = flightService.searchAvailableFlights(departureAirport, arrivalAirport, flightDate, airline, cabinClass);
        return ResponseEntity.ok(flights);
    }

    // PUBLIC: Get Flight By ID
    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable String id) {
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    // ADMIN: Get All Flights
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<FlightDTO>> getAllFlights(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {
        String sortField = sort[0];
        Sort.Direction sortDirection = sort.length > 1 && sort[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        return ResponseEntity.ok(flightService.getAllFlights(pageable));
    }

    // ADMIN: Create Flight
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightDTO> createFlight(@Valid @RequestBody FlightRequest request) {
        return new ResponseEntity<>(flightService.createFlight(request), HttpStatus.CREATED);
    }

    // ADMIN: Update Flight
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FlightDTO> updateFlight(@PathVariable String id, @Valid @RequestBody FlightRequest request) {
        return ResponseEntity.ok(flightService.updateFlight(id, request));
    }

    // ADMIN: Delete Flight
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFlight(@PathVariable String id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
}
