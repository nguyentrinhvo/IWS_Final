package com.example.demo.repository;

import com.example.demo.document.AttractionDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AttractionRepository extends MongoRepository<AttractionDocument, String> {
    Page<AttractionDocument> findByIsActiveTrue(Pageable pageable);

    Page<AttractionDocument> findByAttractionTypeAndIsActiveTrue(
        String attractionType, Pageable pageable);

    Page<AttractionDocument> findByLocationAndIsActiveTrue(
        String location, Pageable pageable);

    @Query("{ 'isActive': true, " +
           "'ticketTypes': { '$elemMatch': { " +
           "'price': { '$gte': ?0, '$lte': ?1 }, 'isAvailable': true } } }")
    Page<AttractionDocument> findByPriceRange(Double minPrice, Double maxPrice, Pageable pageable);

    @Query("{ '$text': { '$search': ?0 }, 'isActive': true }")
    Page<AttractionDocument> searchByKeyword(String keyword, Pageable pageable);
}
