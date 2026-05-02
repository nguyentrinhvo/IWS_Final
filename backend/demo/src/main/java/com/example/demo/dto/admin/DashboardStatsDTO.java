package com.example.demo.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {
    // 1. Doanh thu theo thời gian (Tháng / Quý / Năm hiện tại)
    private Double currentMonthRevenue;
    private Double currentQuarterRevenue;
    private Double currentYearRevenue;

    // 2. Số lượng booking theo trạng thái
    private Map<String, Long> bookingCountsByStatus;

    // 3. Doanh thu theo từng dịch vụ
    private Map<String, Double> revenueByServiceType;

    // 4. Giao dịch theo cổng thanh toán
    private Map<String, Long> transactionsByProvider;
    private Map<String, Double> revenueByProvider;

    // 5. Số lượng người dùng mới trong tháng
    private Long newUsersThisMonth;

    // 6. Top 5 tour
    private List<TopTourDTO> topTours;
    
    // Biểu đồ doanh thu 12 tháng qua
    private List<MonthlyRevenueDTO> last12MonthsRevenue;
}
