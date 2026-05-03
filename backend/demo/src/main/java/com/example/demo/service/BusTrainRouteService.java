package com.example.demo.service;

import com.example.demo.document.BusTrainRouteDocument;
import com.example.demo.dto.bus_train.BusTrainRouteDTO;
import com.example.demo.dto.bus_train.BusTrainRouteRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.BusTrainRouteRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BusTrainRouteService {

    @Autowired
    private BusTrainRouteRepository repository;

    public BusTrainRouteDTO createRoute(BusTrainRouteRequest request) {
        BusTrainRouteDocument document = BusTrainRouteDocument.builder()
                .operatorName(request.getOperatorName())
                .vehicleType(request.getVehicleType())
                .departureCity(request.getDepartureCity())
                .arrivalCity(request.getArrivalCity())
                .departureTime(request.getDepartureTime())
                .arrivalTime(request.getArrivalTime())
                .price(request.getPrice())
                .vehicleClass(request.getVehicleClass())
                .totalSeats(request.getTotalSeats())
                .seatMap(request.getSeatMap())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
        
        BusTrainRouteDocument saved = repository.save(document);
        return mapToDTO(saved);
    }

    public BusTrainRouteDTO updateRoute(String id, BusTrainRouteRequest request) {
        BusTrainRouteDocument document = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found"));

        document.setOperatorName(request.getOperatorName());
        document.setVehicleType(request.getVehicleType());
        document.setDepartureCity(request.getDepartureCity());
        document.setArrivalCity(request.getArrivalCity());
        document.setDepartureTime(request.getDepartureTime());
        document.setArrivalTime(request.getArrivalTime());
        document.setPrice(request.getPrice());
        document.setVehicleClass(request.getVehicleClass());
        document.setTotalSeats(request.getTotalSeats());
        document.setSeatMap(request.getSeatMap());
        if (request.getIsActive() != null) {
            document.setIsActive(request.getIsActive());
        }

        BusTrainRouteDocument updated = repository.save(document);
        return mapToDTO(updated);
    }

    public void deleteRoute(String id) {
        BusTrainRouteDocument document = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found"));
        document.setIsActive(false);
        repository.save(document);
    }

    public BusTrainRouteDTO getRouteById(String id) {
        BusTrainRouteDocument document = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found"));
        return mapToDTO(document);
    }

    public Page<BusTrainRouteDTO> getAllRoutes(Pageable pageable) {
        return repository.findAll(pageable).map(this::mapToDTO);
    }

    public List<BusTrainRouteDTO> searchAvailableRoutes(String departureCity, String arrivalCity, Date startOfDay, Date endOfDay) {
        Page<BusTrainRouteDocument> page = repository.findByRouteAndDate(departureCity, arrivalCity, startOfDay, endOfDay, Pageable.unpaged());
        return page.getContent().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private BusTrainRouteDTO mapToDTO(BusTrainRouteDocument document) {
        return BusTrainRouteDTO.builder()
                .id(document.getId())
                .operatorName(document.getOperatorName())
                .vehicleType(document.getVehicleType())
                .departureCity(document.getDepartureCity())
                .arrivalCity(document.getArrivalCity())
                .departureTime(document.getDepartureTime())
                .arrivalTime(document.getArrivalTime())
                .price(document.getPrice())
                .vehicleClass(document.getVehicleClass())
                .totalSeats(document.getTotalSeats())
                .seatMap(document.getSeatMap())
                .isActive(document.getIsActive())
                .build();
    }
}
