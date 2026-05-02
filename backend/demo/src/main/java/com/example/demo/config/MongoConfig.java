package com.example.demo.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@Configuration
@EnableMongoAuditing
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        String uri = dotenv.get("MONGODB_URI", "mongodb://localhost:27017");
        System.out.println(">>> [MongoConfig] Connecting to: " + uri.substring(0, Math.min(20, uri.length())) + "...");
        return MongoClients.create(uri);
    }
}

