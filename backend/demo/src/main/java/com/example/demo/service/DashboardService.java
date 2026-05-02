package com.example.demo.service;

import com.example.demo.document.BookingDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.dto.admin.DashboardStatsDTO;
import com.example.demo.dto.admin.MonthlyRevenueDTO;
import com.example.demo.dto.admin.TopTourDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class DashboardService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        LocalDate now = LocalDate.now();
        Date startOfMonth = Date.from(now.withDayOfMonth(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date startOfQuarter = Date.from(now.withMonth((now.getMonthValue() - 1) / 3 * 3 + 1).withDayOfMonth(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date startOfYear = Date.from(now.withDayOfYear(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        // 1. Doanh thu theo tháng, quý, năm
        stats.setCurrentMonthRevenue(calculateRevenueSince(startOfMonth));
        stats.setCurrentQuarterRevenue(calculateRevenueSince(startOfQuarter));
        stats.setCurrentYearRevenue(calculateRevenueSince(startOfYear));

        // 2. Số lượng booking theo trạng thái
        stats.setBookingCountsByStatus(getBookingCountsByStatus());

        // 3. Doanh thu theo từng dịch vụ (chỉ tính confirmed/thành công)
        stats.setRevenueByServiceType(getRevenueByServiceType());

        // 4. Giao dịch theo cổng thanh toán
        stats.setTransactionsByProvider(getTransactionsByProvider());
        stats.setRevenueByProvider(getRevenueByProvider());

        // 5. Số lượng người dùng mới trong tháng
        stats.setNewUsersThisMonth(getNewUsersSince(startOfMonth));

        // 6. Top 5 tour
        stats.setTopTours(getTopTours(5));

        // 7. Biểu đồ doanh thu 12 tháng qua
        stats.setLast12MonthsRevenue(getLast12MonthsRevenue());

        return stats;
    }

    private Double calculateRevenueSince(Date fromDate) {
        Aggregation agg = newAggregation(
                match(Criteria.where("status").is("confirmed")
                        .and("createdAt").gte(fromDate)),
                group().sum("totalPrice").as("total")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        Map map = results.getUniqueMappedResult();
        return map != null && map.get("total") != null ? ((Number) map.get("total")).doubleValue() : 0.0;
    }

    private Map<String, Long> getBookingCountsByStatus() {
        Aggregation agg = newAggregation(
                group("status").count().as("count")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        Map<String, Long> map = new HashMap<>();
        for (Map result : results.getMappedResults()) {
            map.put((String) result.get("_id"), ((Number) result.get("count")).longValue());
        }
        return map;
    }

    private Map<String, Double> getRevenueByServiceType() {
        Aggregation agg = newAggregation(
                match(Criteria.where("status").is("confirmed")),
                group("serviceType").sum("totalPrice").as("revenue")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        Map<String, Double> map = new HashMap<>();
        for (Map result : results.getMappedResults()) {
            map.put((String) result.get("_id"), ((Number) result.get("revenue")).doubleValue());
        }
        return map;
    }

    private Map<String, Long> getTransactionsByProvider() {
        Aggregation agg = newAggregation(
                match(Criteria.where("payment.provider").exists(true)),
                group("payment.provider").count().as("count")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        Map<String, Long> map = new HashMap<>();
        for (Map result : results.getMappedResults()) {
            map.put((String) result.get("_id"), ((Number) result.get("count")).longValue());
        }
        return map;
    }

    private Map<String, Double> getRevenueByProvider() {
        Aggregation agg = newAggregation(
                match(Criteria.where("status").is("confirmed").and("payment.provider").exists(true)),
                group("payment.provider").sum("totalPrice").as("revenue")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        Map<String, Double> map = new HashMap<>();
        for (Map result : results.getMappedResults()) {
            map.put((String) result.get("_id"), ((Number) result.get("revenue")).doubleValue());
        }
        return map;
    }

    private Long getNewUsersSince(Date fromDate) {
        Query query = new Query(Criteria.where("createdAt").gte(fromDate));
        return mongoTemplate.count(query, UserDocument.class);
    }

    private List<TopTourDTO> getTopTours(int limit) {
        Aggregation agg = newAggregation(
                match(Criteria.where("serviceType").is("tour").and("status").is("confirmed")),
                group("serviceId")
                        .count().as("totalBookings")
                        .sum("totalPrice").as("totalRevenue")
                        .first("snapshotName").as("tourName"),
                sort(Sort.Direction.DESC, "totalBookings"),
                limit(limit)
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        List<TopTourDTO> topTours = new ArrayList<>();
        for (Map result : results.getMappedResults()) {
            topTours.add(TopTourDTO.builder()
                    .tourId((String) result.get("_id"))
                    .tourName((String) result.get("tourName"))
                    .totalBookings(((Number) result.get("totalBookings")).longValue())
                    .totalRevenue(((Number) result.get("totalRevenue")).doubleValue())
                    .build());
        }
        return topTours;
    }

    private List<MonthlyRevenueDTO> getLast12MonthsRevenue() {
        LocalDate now = LocalDate.now();
        Date oneYearAgo = Date.from(now.minusMonths(11).withDayOfMonth(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Aggregation agg = newAggregation(
                match(Criteria.where("status").is("confirmed").and("createdAt").gte(oneYearAgo)),
                project("totalPrice")
                        .andExpression("year(createdAt)").as("year")
                        .andExpression("month(createdAt)").as("month"),
                group("year", "month").sum("totalPrice").as("revenue")
        );

        AggregationResults<Map> results = mongoTemplate.aggregate(agg, BookingDocument.class, Map.class);
        
        // Tạo map kết quả
        Map<String, Double> revenueMap = new HashMap<>();
        for (Map result : results.getMappedResults()) {
            Map<String, Object> idMap = (Map<String, Object>) result.get("_id");
            int year = ((Number) idMap.get("year")).intValue();
            int month = ((Number) idMap.get("month")).intValue();
            String key = String.format("%04d-%02d", year, month);
            revenueMap.put(key, ((Number) result.get("revenue")).doubleValue());
        }

        // Lấp đầy 12 tháng kể cả tháng không có doanh thu
        List<MonthlyRevenueDTO> monthlyData = new ArrayList<>();
        for (int i = 11; i >= 0; i--) {
            YearMonth ym = YearMonth.from(now.minusMonths(i));
            String key = String.format("%04d-%02d", ym.getYear(), ym.getMonthValue());
            monthlyData.add(new MonthlyRevenueDTO(key, revenueMap.getOrDefault(key, 0.0)));
        }

        return monthlyData;
    }
}
