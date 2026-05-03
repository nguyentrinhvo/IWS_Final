package com.example.demo.repository;

import com.example.demo.document.TourDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends MongoRepository<TourDocument, String> {
    Page<TourDocument> findByIsDeletedFalse(Pageable pageable);
    Page<TourDocument> findByTourTypeAndIsDeletedFalse(String tourType, Pageable pageable);
    Page<TourDocument> findByCategoryIdAndIsDeletedFalse(String categoryId, Pageable pageable);
    Page<TourDocument> findByDestinationAndIsDeletedFalse(String destination, Pageable pageable);
    Page<TourDocument> findByCountryAndIsDeletedFalse(String country, Pageable pageable);

    Page<TourDocument> findByPriceAdultBetweenAndIsDeletedFalse(Double minPrice, Double maxPrice, Pageable pageable);
    Page<TourDocument> findByDurationDaysAndIsDeletedFalse(Integer durationDays, Pageable pageable);

    @Query("{ '$and': [ { '$or': [ {'nameVi': { '$regex': ?0, '$options': 'i' }}, {'nameEn': { '$regex': ?0, '$options': 'i' }} ] }, { 'isDeleted': false } ] }")
    Page<TourDocument> searchByKeyword(String keyword, Pageable pageable);
}
