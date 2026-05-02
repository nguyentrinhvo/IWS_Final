package com.example.demo.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopTourDTO {
    private String tourId;
    private String tourName;
    private Long totalBookings;
    private Double totalRevenue;
}
