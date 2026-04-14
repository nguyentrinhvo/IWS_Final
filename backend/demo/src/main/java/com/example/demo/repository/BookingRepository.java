package com.example.demo.repository;

import com.example.demo.document.BookingDocument;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends MongoRepository<BookingDocument, String> {
    Page<BookingDocument> findByUserId(String userId, Pageable pageable);
    Page<BookingDocument> findByUserIdAndServiceType(String userId, String serviceType, Pageable pageable);

    Page<BookingDocument> findByStatus(String status, Pageable pageable);
    Page<BookingDocument> findByServiceTypeAndStatus(String serviceType, String status, Pageable pageable);
    Page<BookingDocument> findByCreatedAtBetween(Date from, Date to, Pageable pageable);

    boolean existsByUserIdAndServiceIdAndStatus(String userId, String serviceId, String status);
}
