package com.example.demo.service;

import com.example.demo.document.CategoryDocument;
import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.category.CategoryDTO;
import com.example.demo.dto.category.CategoryRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CategoryRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public org.springframework.data.domain.Page<CategoryDTO> getAllCategories(String keyword, org.springframework.data.domain.Pageable pageable) {
        org.springframework.data.domain.Page<CategoryDocument> categories;
        if (keyword != null && !keyword.isEmpty()) {
            categories = categoryRepository.findByNameViContainingIgnoreCaseOrNameEnContainingIgnoreCase(keyword, keyword, pageable);
        } else {
            categories = categoryRepository.findAll(pageable);
        }
        return categories.map(this::mapToDTO);
    }

    public CategoryDTO getCategoryById(String id) {
        CategoryDocument category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return mapToDTO(category);
    }

    public CategoryDTO createCategory(CategoryRequest request) {
        CategoryDocument category = new CategoryDocument();
        mapRequestToDocument(request, category);
        category.setCreatedAt(new Date());
        
        CategoryDocument savedCategory = categoryRepository.save(category);
        return mapToDTO(savedCategory);
    }

    public CategoryDTO updateCategory(String id, CategoryRequest request) {
        CategoryDocument category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        
        mapRequestToDocument(request, category);
        
        CategoryDocument updatedCategory = categoryRepository.save(category);
        return mapToDTO(updatedCategory);
    }

    public MessageResponse deleteCategory(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);
        return new MessageResponse("Category deleted successfully");
    }

    private void mapRequestToDocument(CategoryRequest request, CategoryDocument category) {
        category.setNameVi(request.getNameVi());
        category.setNameEn(request.getNameEn());
        category.setDescriptionVi(request.getDescriptionVi());
        category.setDescriptionEn(request.getDescriptionEn());
        category.setImageUrl(request.getImageUrl());
    }

    private CategoryDTO mapToDTO(CategoryDocument category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setNameVi(category.getNameVi());
        dto.setNameEn(category.getNameEn());
        dto.setDescriptionVi(category.getDescriptionVi());
        dto.setDescriptionEn(category.getDescriptionEn());
        dto.setImageUrl(category.getImageUrl());
        dto.setCreatedAt(category.getCreatedAt());
        return dto;
    }
}
