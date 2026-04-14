package com.example.demo.document;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDocument {
    @Id
    private String id;
    private String nameVi;
    private String nameEn;
    private String descriptionVi;
    private String descriptionEn;
    private String imageUrl;
    private Date createdAt;
}
