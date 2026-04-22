package com.example.demo.dto.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {
    private String nameVi;
    private String nameEn;
    private String descriptionVi;
    private String descriptionEn;
    private String imageUrl;
}
