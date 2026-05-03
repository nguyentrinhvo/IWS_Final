package com.example.demo.repository;

import com.example.demo.document.FlightDocument;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends MongoRepository<FlightDocument, String> {
    Page<FlightDocument> findByDepartureAirportAndArrivalAirportAndIsActiveTrue(
        String departureAirport, String arrivalAirport, Pageable pageable);

    Page<FlightDocument> findByAirlineAndIsActiveTrue(String airline, Pageable pageable);
    Page<FlightDocument> findByCabinClassAndIsActiveTrue(String cabinClass, Pageable pageable);

    Page<FlightDocument> findByBasePriceBetweenAndIsActiveTrue(
        Double minPrice, Double maxPrice, Pageable pageable);

    Page<FlightDocument> findByDepartureAirportAndArrivalAirportAndCabinClassAndIsActiveTrue(
        String departureAirport, String arrivalAirport, String cabinClass, Pageable pageable);

    @Query("{ 'departureAirport': ?0, 'arrivalAirport': ?1, 'isActive': true }")
    List<FlightDocument> findAvailableFlights(String departureAirport, String arrivalAirport);
}
