package com.example.demo.repository;

import com.example.demo.document.ProviderDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProviderRepository extends MongoRepository<ProviderDocument, String> {
    Optional<ProviderDocument> findByName(String name);
}
