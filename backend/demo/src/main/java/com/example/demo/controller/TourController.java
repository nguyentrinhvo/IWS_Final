package com.example.demo.controller;

import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.tour.TourDTO;
import com.example.demo.dto.tour.TourRequest;
import com.example.demo.service.TourService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping("/tours")
    public ResponseEntity<Page<TourDTO>> getTours(
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String tourType,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Integer durationDays,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean isActive,
            @org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        
        Page<TourDTO> tours = tourService.getTours(categoryId, tourType, destination, country, 
                                                   durationDays, maxPrice, keyword, isActive, pageable);
        return ResponseEntity.ok(tours);
    }

    @GetMapping("/tours/{id}")
    public ResponseEntity<TourDTO> getTourById(@PathVariable String id) {
        return ResponseEntity.ok(tourService.getTourById(id));
    }

    @PostMapping("/admin/tours")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourDTO> createTour(@Valid @RequestBody TourRequest request) {
        return new ResponseEntity<>(tourService.createTour(request), HttpStatus.CREATED);
    }

    @PutMapping("/admin/tours/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourDTO> updateTour(@PathVariable String id, @Valid @RequestBody TourRequest request) {
        return ResponseEntity.ok(tourService.updateTour(id, request));
    }

    @DeleteMapping("/admin/tours/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteTour(@PathVariable String id) {
        return ResponseEntity.ok(tourService.deleteTour(id));
    }
}
