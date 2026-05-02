package com.example.demo.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OAuthLoginRequest {
    @NotBlank(message = "Token cannot be blank")
    private String token;
}
