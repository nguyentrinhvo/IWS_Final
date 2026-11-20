package com.example.demo.service;

import com.example.demo.document.UserDocument;
import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.user.ChangePasswordRequest;
import com.example.demo.dto.user.UpdateProfileRequest;
import com.example.demo.dto.user.UserDTO;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO getMyProfile(String email) {
        UserDocument user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setLastActiveAt(new Date());
        userRepository.save(user);
        
        return convertToDTO(user);
    }

    public UserDTO updateMyProfile(String email, UpdateProfileRequest request) {
        UserDocument user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setLanguage(request.getLanguage());
        user.setGender(request.getGender());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setCity(request.getCity());
        user.setUpdatedAt(new Date());

        userRepository.save(user);
        return convertToDTO(user);
    }

    public MessageResponse changePassword(String email, ChangePasswordRequest request) {
        UserDocument user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Incorrect old password");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(new Date());
        userRepository.save(user);

        return new MessageResponse("Password changed successfully");
    }

    // ── Admin methods ─────────────────────────────────────────────

    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return getAllUsers(null, pageable);
    }

    public Page<UserDTO> getAllUsers(String keyword, Pageable pageable) {
        Page<UserDocument> users;
        if (keyword != null && !keyword.isEmpty()) {
            users = userRepository.searchByKeyword(keyword, pageable);
        } else {
            users = userRepository.findAll(pageable);
        }
        return users.map(this::convertToDTO);
    }

    public MessageResponse toggleLockUser(String id) {
        UserDocument user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setIsLocked(!Boolean.TRUE.equals(user.getIsLocked()));
        user.setUpdatedAt(new Date());
        userRepository.save(user);

        String status = user.getIsLocked() ? "locked" : "unlocked";
        return new MessageResponse("User " + status + " successfully");
    }

    public UserDTO adminCreateUser(com.example.demo.dto.admin.CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        UserDocument user = new UserDocument();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole() != null ? request.getRole().toUpperCase() : "CUSTOMER");
        user.setIsLocked(false);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setProvider("local");

        userRepository.save(user);
        return convertToDTO(user);
    }

    private UserDTO convertToDTO(UserDocument user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .language(user.getLanguage())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .city(user.getCity())
                .provider(user.getProvider())
                .createdAt(user.getCreatedAt())
                .isLocked(user.getIsLocked())
                .lastActiveAt(user.getLastActiveAt())
                .build();
    }

    public MessageResponse changeUserRole(String id, String role) {
        UserDocument user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setRole(role.toUpperCase());
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        
        return new MessageResponse("User role updated to " + role.toUpperCase());
    }
}
