package com.example.demo.service;

import com.example.demo.document.UserDocument;
import com.example.demo.dto.auth.*;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtTokenProvider;
import com.example.demo.security.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JavaMailSender mailSender;

    public MessageResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        UserDocument user = UserDocument.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .role("customer")
                .isLocked(false)
                .build();

        userRepository.save(user);

        return new MessageResponse("User registered successfully!");
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        String jwt = jwtTokenProvider.generateToken(userDetails.getEmail(), role.toLowerCase());

        UserDocument user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .avatar(user.getAvatarUrl())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .city(user.getCity())
                .build();
    }

    public MessageResponse forgotPassword(ForgotPasswordRequest request) {
        UserDocument user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User with given email not found"));

        // Use JWT for a password reset token (expiring in 1 hour)
        // Alternative: we could use a random UUID and save it to the DB if the TokenProvider is solely for auth.
        // But for simplicity and statelessness, we can generate a short-lived JWT.
        String resetToken = jwtTokenProvider.generateToken(user.getEmail(), user.getRole());

        // In a real app, this would point to a frontend route
        String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, please click the link below:\n" + resetUrl);

        mailSender.send(message);

        return new MessageResponse("Password reset link has been sent to your email");
    }

    public MessageResponse resetPassword(ResetPasswordRequest request) {
        if (!jwtTokenProvider.validateToken(request.getToken())) {
            throw new BadRequestException("Invalid or expired reset token");
        }

        String email = jwtTokenProvider.getEmailFromToken(request.getToken());

        UserDocument user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return new MessageResponse("Password has been reset successfully. You can now log in.");
    }
}
