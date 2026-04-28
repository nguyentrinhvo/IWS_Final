package com.example.demo.service;

import com.example.demo.document.UserDocument;
import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.user.ChangePasswordRequest;
import com.example.demo.dto.user.UpdateProfileRequest;
import com.example.demo.dto.user.UserProfileResponse;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserDocument getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private UserProfileResponse mapToResponse(UserDocument user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .isLocked(user.getIsLocked())
                .language(user.getLanguage())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public UserProfileResponse getMyProfile() {
        return mapToResponse(getCurrentUser());
    }

    public UserProfileResponse updateMyProfile(UpdateProfileRequest request) {
        UserDocument user = getCurrentUser();
        
        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getPhoneNumber() != null) user.setPhoneNumber(request.getPhoneNumber());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getLanguage() != null) user.setLanguage(request.getLanguage());
        
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        
        return mapToResponse(user);
    }

    public MessageResponse changePassword(ChangePasswordRequest request) {
        UserDocument user = getCurrentUser();
        
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Incorrect old password");
        }
        
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        
        return new MessageResponse("Password updated successfully");
    }

    public Page<UserProfileResponse> getAllUsers(String keyword, Pageable pageable) {
        Page<UserDocument> users;
        if (keyword != null && !keyword.trim().isEmpty()) {
            users = userRepository.searchByKeyword(keyword, pageable);
        } else {
            users = userRepository.findAll(pageable);
        }
        return users.map(this::mapToResponse);
    }

    public MessageResponse toggleLockUser(String id) {
        UserDocument user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if ("admin".equalsIgnoreCase(user.getRole())) {
            throw new BadRequestException("Cannot lock an admin account");
        }
        
        user.setIsLocked(user.getIsLocked() != null ? !user.getIsLocked() : true);
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        
        return new MessageResponse(user.getIsLocked() ? "User has been locked" : "User has been unlocked");
    }
}
