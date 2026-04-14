package com.example.demo.document;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDocument {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    @Indexed
    private String fullName;
    private String passwordHash;
    private String phoneNumber;
    private String avatarUrl;
    private String role;             // "customer" | "admin"
    private Boolean isLocked;
    private String language;         // "vi" | "en"
    private Date createdAt;
    private Date updatedAt;
}
