package com.example.demo.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.Date;

@Data
public class UpdateProfileRequest {
    @NotBlank
    private String fullName;
    private String phoneNumber;
    private String avatarUrl;
    private String language;
    private String gender;
    private Date dateOfBirth;
    private String city;
}
