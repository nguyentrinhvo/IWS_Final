package com.example.demo.repository;

import com.example.demo.document.UserDocument;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserDocument, String> {
    Optional<UserDocument> findByEmail(String email);
    boolean existsByEmail(String email);
    Page<UserDocument> findByRole(String role, Pageable pageable);

    @Query("{ '$or': [ {'fullName': { '$regex': ?0, '$options': 'i' }}, {'email': { '$regex': ?0, '$options': 'i' }} ] }")
    Page<UserDocument> searchByKeyword(String keyword, Pageable pageable);
}
