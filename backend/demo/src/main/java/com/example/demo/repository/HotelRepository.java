package com.example.demo.repository;

import com.example.demo.document.HotelDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends MongoRepository<HotelDocument, String> {
    Page<HotelDocument> findByCityAndIsActiveTrue(String city, Pageable pageable);

    Page<HotelDocument> findByCityAndStarRatingAndIsActiveTrue(
        String city, Integer starRating, Pageable pageable);

    Page<HotelDocument> findByCityAndStarRatingGreaterThanEqualAndIsActiveTrue(
        String city, Integer starRating, Pageable pageable);

    Page<HotelDocument> findByCountryAndIsActiveTrue(String country, Pageable pageable);

    @Query("{ 'city': ?0, 'isActive': true, " +
           "'roomTypes': { '$elemMatch': { " +
           "'pricePerNight': { '$gte': ?1, '$lte': ?2 }, 'availableRooms': { '$gt': 0 } } } }")
    Page<HotelDocument> findByPriceRange(String city, Double minPrice, Double maxPrice, Pageable pageable);

    @Query("{ '$text': { '$search': ?0 }, 'isActive': true }")
    Page<HotelDocument> searchByName(String keyword, Pageable pageable);
}
