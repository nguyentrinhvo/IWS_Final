package com.example.demo.dto.category;

import java.util.Date;
import lombok.Data;

@Data
public class CategoryDTO {
    private String id;
    private String nameVi;
    private String nameEn;
    private String descriptionVi;
    private String descriptionEn;
    private String imageUrl;
    private Date createdAt;
}
