package com.example.demo.service;

import com.example.demo.document.CategoryDocument;
import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.category.CategoryRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CategoryRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDocument> getAllCategories() {
        return categoryRepository.findAll();
    }

    public CategoryDocument createCategory(CategoryRequest request) {
        CategoryDocument category = CategoryDocument.builder()
                .nameVi(request.getNameVi())
                .nameEn(request.getNameEn())
                .descriptionVi(request.getDescriptionVi())
                .descriptionEn(request.getDescriptionEn())
                .imageUrl(request.getImageUrl())
                .createdAt(new Date())
                .build();
        
        return categoryRepository.save(category);
    }

    public CategoryDocument updateCategory(String id, CategoryRequest request) {
        CategoryDocument category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
                
        if (request.getNameVi() != null) category.setNameVi(request.getNameVi());
        if (request.getNameEn() != null) category.setNameEn(request.getNameEn());
        if (request.getDescriptionVi() != null) category.setDescriptionVi(request.getDescriptionVi());
        if (request.getDescriptionEn() != null) category.setDescriptionEn(request.getDescriptionEn());
        if (request.getImageUrl() != null) category.setImageUrl(request.getImageUrl());
        
        return categoryRepository.save(category);
    }

    public MessageResponse deleteCategory(String id) {
        CategoryDocument category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        categoryRepository.delete(category);
        return new MessageResponse("Category deleted successfully");
    }
}
