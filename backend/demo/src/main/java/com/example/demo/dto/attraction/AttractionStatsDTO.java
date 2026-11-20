package com.example.demo.dto.attraction;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttractionStatsDTO {
    private long totalAttractions;
    private long activeAttractions;
    private long totalTickets;
    private double avgTicketPrice;
}
