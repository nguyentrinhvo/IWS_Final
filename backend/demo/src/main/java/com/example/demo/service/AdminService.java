package com.example.demo.service;

import com.example.demo.document.BookingDocument;
import com.example.demo.document.TourDocument;
import com.example.demo.dto.admin.DashboardStatsDTO;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.repository.UserRepository;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public DashboardStatsDTO getDashboardStats() {
        // 1. Current Year Revenue
        Aggregation revenueAgg = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("status").in("confirmed", "success")),
            Aggregation.group().sum("totalPrice").as("total")
        );
        AggregationResults<Map> revenueRes = mongoTemplate.aggregate(revenueAgg, "bookings", Map.class);
        double totalRevenue = 0;
        if (!revenueRes.getMappedResults().isEmpty()) {
            Object total = revenueRes.getMappedResults().get(0).get("total");
            if (total != null) totalRevenue = Double.parseDouble(total.toString());
        }

        // 2. New Users (Total for now as a placeholder for "this month")
        long newUsers = userRepository.count();

        // 3. Booking Counts by Status
        Map<String, Long> statusCounts = bookingRepository.findAll().stream()
            .collect(Collectors.groupingBy(BookingDocument::getStatus, Collectors.counting()));

        // 4. Monthly Revenue Insights
        List<DashboardStatsDTO.MonthlyRevenueDTO> last12MonthsRevenue = getMonthlyRevenue();

        // 5. Revenue By Provider (Payment Mix)
        Map<String, Double> revenueByProvider = getRevenueByProvider();

        // 6. Top Tours
        List<DashboardStatsDTO.TopTourDTO> topTours = getTopTours();

        return DashboardStatsDTO.builder()
                .currentYearRevenue(totalRevenue)
                .totalBookings(bookingRepository.count())
                .newUsersThisMonth(newUsers)
                .last12MonthsRevenue(last12MonthsRevenue)
                .revenueByProvider(revenueByProvider)
                .bookingCountsByStatus(statusCounts)
                .topTours(topTours)
                .build();
    }

    private List<DashboardStatsDTO.MonthlyRevenueDTO> getMonthlyRevenue() {
        List<BookingDocument> confirmedBookings = mongoTemplate.find(
            new Query(Criteria.where("status").in("confirmed", "success")),
            BookingDocument.class
        );

        Map<String, Double> monthlyMap = confirmedBookings.stream()
            .collect(Collectors.groupingBy(
                b -> {
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(b.getCreatedAt());
                    return String.format("%d-%02d", cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1);
                },
                Collectors.summingDouble(BookingDocument::getTotalPrice)
            ));

        return monthlyMap.entrySet().stream()
            .map(e -> new DashboardStatsDTO.MonthlyRevenueDTO(e.getKey(), e.getValue()))
            .sorted(Comparator.comparing(DashboardStatsDTO.MonthlyRevenueDTO::getMonth))
            .collect(Collectors.toList());
    }

    private Map<String, Double> getRevenueByProvider() {
        Aggregation agg = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("payment.provider").exists(true)),
            Aggregation.group("payment.provider").sum("totalPrice").as("total")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, "bookings", Map.class);
        
        return results.getMappedResults().stream()
            .collect(Collectors.toMap(
                r -> r.get("_id").toString(),
                r -> Double.parseDouble(r.get("total").toString())
            ));
    }

    private List<DashboardStatsDTO.TopTourDTO> getTopTours() {
        // Group confirmed bookings by serviceId for serviceType='tour'
        Aggregation agg = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("serviceType").is("tour").and("status").in("confirmed", "success")),
            Aggregation.group("serviceId")
                .count().as("count")
                .sum("totalPrice").as("revenue")
                .first("snapshotName").as("name")
        );
        AggregationResults<Map> results = mongoTemplate.aggregate(agg, "bookings", Map.class);

        return results.getMappedResults().stream()
            .map(r -> DashboardStatsDTO.TopTourDTO.builder()
                .tourId(r.get("_id").toString())
                .tourName(r.get("name").toString())
                .totalBookings(Long.parseLong(r.get("count").toString()))
                .totalRevenue(Double.parseDouble(r.get("revenue").toString()))
                .build())
            .sorted(Comparator.comparing(DashboardStatsDTO.TopTourDTO::getTotalRevenue).reversed())
            .limit(5)
            .collect(Collectors.toList());
    }
}
