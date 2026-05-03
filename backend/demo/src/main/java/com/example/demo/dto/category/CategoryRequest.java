package com.example.demo.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Vietnamese name is required")
    private String nameVi;
    
    @NotBlank(message = "English name is required")
    private String nameEn;
    
    private String descriptionVi;
    private String descriptionEn;
    private String imageUrl;
}
