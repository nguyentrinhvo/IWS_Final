package com.example.demo.repository;

import com.example.demo.document.CategoryDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<CategoryDocument, String> {
    org.springframework.data.domain.Page<CategoryDocument> findByNameViContainingIgnoreCaseOrNameEnContainingIgnoreCase(String nameVi, String nameEn, org.springframework.data.domain.Pageable pageable);
}
