package com.example.demo.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transportProviders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderDocument {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    private String type; // "Bus", "Train"
    private String status; // "Active", "Inactive"
    private String phone;
    private String email;
    private String logoUrl;
}
