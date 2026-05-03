package com.example.demo.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private String id;
    private String email;
    private String fullName;
    private String role;
    private String avatar;
    private String gender;
    private Date dateOfBirth;
    private String city;
}
