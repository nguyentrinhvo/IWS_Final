package com.example.demo.controller;

import com.example.demo.dto.bus_train.BusTrainRouteDTO;
import com.example.demo.dto.bus_train.BusTrainRouteRequest;
import com.example.demo.service.BusTrainRouteService;
import jakarta.validation.Valid;
import java.util.Calendar;
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
@RequestMapping("/api/bus-train")
public class BusTrainRouteController {

    @Autowired
    private BusTrainRouteService service;

    // PUBLIC: Search routes
    @GetMapping("/search")
    public ResponseEntity<List<BusTrainRouteDTO>> searchRoutes(
            @RequestParam String departureCity,
            @RequestParam String arrivalCity,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date travelDate) {
        
        Calendar cal = Calendar.getInstance();
        cal.setTime(travelDate);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date startOfDay = cal.getTime();
        
        cal.add(Calendar.DAY_OF_MONTH, 1);
        Date endOfDay = cal.getTime();

        List<BusTrainRouteDTO> routes = service.searchAvailableRoutes(departureCity, arrivalCity, startOfDay, endOfDay);
        return ResponseEntity.ok(routes);
    }

    // PUBLIC: Get Route By ID
    @GetMapping("/{id}")
    public ResponseEntity<BusTrainRouteDTO> getRouteById(@PathVariable String id) {
        return ResponseEntity.ok(service.getRouteById(id));
    }

    // ADMIN: Get All Routes
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<BusTrainRouteDTO>> getAllRoutes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {
        String sortField = sort[0];
        Sort.Direction sortDirection = sort.length > 1 && sort[1].equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        return ResponseEntity.ok(service.getAllRoutes(pageable));
    }

    // ADMIN: Create Route
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusTrainRouteDTO> createRoute(@Valid @RequestBody BusTrainRouteRequest request) {
        return new ResponseEntity<>(service.createRoute(request), HttpStatus.CREATED);
    }

    // ADMIN: Update Route
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusTrainRouteDTO> updateRoute(@PathVariable String id, @Valid @RequestBody BusTrainRouteRequest request) {
        return ResponseEntity.ok(service.updateRoute(id, request));
    }

    // ADMIN: Delete Route
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRoute(@PathVariable String id) {
        service.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
}
