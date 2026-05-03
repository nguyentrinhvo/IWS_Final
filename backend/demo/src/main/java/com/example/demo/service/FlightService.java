package com.example.demo.service;

import com.example.demo.document.FlightDocument;
import com.example.demo.dto.flight.FlightDTO;
import com.example.demo.dto.flight.FlightRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.FlightRepository;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public FlightDTO createFlight(FlightRequest request) {
        FlightDocument flight = FlightDocument.builder()
                .airline(request.getAirline())
                .flightNumber(request.getFlightNumber())
                .departureAirport(request.getDepartureAirport())
                .arrivalAirport(request.getArrivalAirport())
                .cabinClass(request.getCabinClass())
                .basePrice(request.getBasePrice())
                .durationMinutes(request.getDurationMinutes())
                .totalSeats(request.getTotalSeats())
                .schedules(request.getSchedules())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
        
        FlightDocument saved = flightRepository.save(flight);
        return mapToDTO(saved);
    }

    public FlightDTO updateFlight(String id, FlightRequest request) {
        FlightDocument flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        flight.setAirline(request.getAirline());
        flight.setFlightNumber(request.getFlightNumber());
        flight.setDepartureAirport(request.getDepartureAirport());
        flight.setArrivalAirport(request.getArrivalAirport());
        flight.setCabinClass(request.getCabinClass());
        flight.setBasePrice(request.getBasePrice());
        flight.setDurationMinutes(request.getDurationMinutes());
        flight.setTotalSeats(request.getTotalSeats());
        flight.setSchedules(request.getSchedules());
        if (request.getIsActive() != null) {
            flight.setIsActive(request.getIsActive());
        }

        FlightDocument updated = flightRepository.save(flight);
        return mapToDTO(updated);
    }

    public void deleteFlight(String id) {
        FlightDocument flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));
        flight.setIsActive(false);
        flightRepository.save(flight);
    }

    public FlightDTO getFlightById(String id) {
        FlightDocument flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));
        return mapToDTO(flight);
    }

    public Page<FlightDTO> getAllFlights(Pageable pageable) {
        return flightRepository.findAll(pageable).map(this::mapToDTO);
    }

    public List<FlightDTO> searchAvailableFlights(String departureAirport, String arrivalAirport, Date flightDate, String airline, String cabinClass) {
        List<FlightDocument> flights = flightRepository.findAvailableFlights(departureAirport, arrivalAirport);
        System.out.println("DEBUG: Found " + flights.size() + " flights in DB for " + departureAirport + " -> " + arrivalAirport);
        
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
        String searchDateStr = sdf.format(flightDate);
        System.out.println("DEBUG: Searching for date " + searchDateStr + " (raw flightDate: " + flightDate + ")");

        return flights.stream()
                .filter(f -> {
                    boolean matchAirline = airline == null || f.getAirline().equalsIgnoreCase(airline);
                    boolean matchCabin = cabinClass == null || f.getCabinClass().equalsIgnoreCase(cabinClass);
                    boolean matchSchedule = f.getSchedules() != null && f.getSchedules().stream()
                            .anyMatch(s -> {
                                boolean hasSeats = s.getAvailableSeats() != null && s.getAvailableSeats() > 0;
                                boolean matchDate = s.getDepartureTime() != null && sdf.format(s.getDepartureTime()).equals(searchDateStr);
                                return hasSeats && matchDate;
                            });
                    return matchAirline && matchCabin && matchSchedule;
                })
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<FlightDTO> getFeaturedFlights() {
        return flightRepository.findAll().stream()
                .filter(f -> f.getIsActive() != null && f.getIsActive())
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllLocations() {
        List<FlightDocument> flights = flightRepository.findAll();
        Set<String> locations = new HashSet<>();
        for (FlightDocument f : flights) {
            if (f.getIsActive() != null && f.getIsActive()) {
                if (f.getDepartureAirport() != null) locations.add(f.getDepartureAirport());
                if (f.getArrivalAirport() != null) locations.add(f.getArrivalAirport());
            }
        }
        return new ArrayList<>(locations);
    }

    private FlightDTO mapToDTO(FlightDocument flight) {
        return FlightDTO.builder()
                .id(flight.getId())
                .airline(flight.getAirline())
                .flightNumber(flight.getFlightNumber())
                .departureAirport(flight.getDepartureAirport())
                .arrivalAirport(flight.getArrivalAirport())
                .departureCity(flight.getDepartureCity())
                .arrivalCity(flight.getArrivalCity())
                .departureAirportName(flight.getDepartureAirportName())
                .arrivalAirportName(flight.getArrivalAirportName())
                .imageUrl(flight.getImageUrl())
                .cabinClass(flight.getCabinClass())
                .basePrice(flight.getBasePrice())
                .durationMinutes(flight.getDurationMinutes())
                .totalSeats(flight.getTotalSeats())
                .schedules(flight.getSchedules())
                .isActive(flight.getIsActive())
                .build();
    }
}
