package com.example.demo.repository;

import com.example.demo.document.BusTrainRouteDocument;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BusTrainRouteRepository extends MongoRepository<BusTrainRouteDocument, String> {
    Page<BusTrainRouteDocument> findByDepartureCityAndArrivalCityAndIsActiveTrue(
        String departureCity, String arrivalCity, Pageable pageable);

    Page<BusTrainRouteDocument> findByVehicleTypeAndIsActiveTrue(
        String vehicleType, Pageable pageable);

    @Query("{ 'departureCity': ?0, 'arrivalCity': ?1, 'isActive': true, " +
           "'departureTime': { '$gte': ?2, '$lt': ?3 } }")
    Page<BusTrainRouteDocument> findByRouteAndDate(
        String departureCity, String arrivalCity, Date startOfDay, Date endOfDay, Pageable pageable);

    Page<BusTrainRouteDocument> findByPriceBetweenAndIsActiveTrue(
        Double minPrice, Double maxPrice, Pageable pageable);

    Page<BusTrainRouteDocument> findByOperatorNameAndIsActiveTrue(
        String operatorName, Pageable pageable);
}
