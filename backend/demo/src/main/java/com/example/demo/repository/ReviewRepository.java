package com.example.demo.repository;

import com.example.demo.document.ReviewDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends MongoRepository<ReviewDocument, String> {
    Page<ReviewDocument> findByServiceIdAndServiceTypeAndIsHiddenFalse(
        String serviceId, String serviceType, Pageable pageable);

    boolean existsByUserIdAndBookingId(String userId, String bookingId);
    
    // Spring Data MongoDB 4.x supports @Aggregation for this. 
    // Usually it returns an AggregationResults, but for simplicity here we return a mapped projection or define it via MongoTemplate in a custom repo.
}
