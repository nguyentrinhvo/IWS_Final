package com.example.demo.controller;

import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.user.ChangePasswordRequest;
import com.example.demo.dto.user.UpdateProfileRequest;
import com.example.demo.dto.user.UserProfileResponse;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springdoc.core.annotations.ParameterObject;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    // --- User Profile Endpoints ---

    @GetMapping("/users/me")
    public ResponseEntity<UserProfileResponse> getMyProfile() {
        return ResponseEntity.ok(userService.getMyProfile());
    }

    @PutMapping("/users/me")
    public ResponseEntity<UserProfileResponse> updateMyProfile(@RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateMyProfile(request));
    }

    @PutMapping("/users/me/password")
    public ResponseEntity<MessageResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(userService.changePassword(request));
    }

    // --- Admin Endpoints ---

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/users")
    public ResponseEntity<Page<UserProfileResponse>> getAllUsers(
            @RequestParam(required = false) String keyword,
            @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(keyword, pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/users/{id}/lock")
    public ResponseEntity<MessageResponse> toggleLockUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.toggleLockUser(id));
    }
}
