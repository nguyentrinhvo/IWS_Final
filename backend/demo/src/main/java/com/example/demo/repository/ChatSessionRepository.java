package com.example.demo.repository;

import com.example.demo.document.ChatSessionDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatSessionRepository extends MongoRepository<ChatSessionDocument, String> {
}
