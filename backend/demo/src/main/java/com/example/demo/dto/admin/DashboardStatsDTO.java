package com.example.demo.dto.admin;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private Double currentYearRevenue;
    private Long totalBookings;
    private Long newUsersThisMonth;
    private List<MonthlyRevenueDTO> last12MonthsRevenue;
    private Map<String, Double> revenueByProvider;
    private Map<String, Long> bookingCountsByStatus;
    private List<TopTourDTO> topTours;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyRevenueDTO {
        private String month; // e.g. "2024-06"
        private Double revenue;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopTourDTO {
        private String tourId;
        private String tourName;
        private Long totalBookings;
        private Double totalRevenue;
    }
}
