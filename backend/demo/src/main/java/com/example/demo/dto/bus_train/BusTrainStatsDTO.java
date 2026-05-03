package com.example.demo.dto.bus_train;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BusTrainStatsDTO {
    private long totalProviders;
    private long totalRoutes;
    private long activeRoutes;
    private long availableSeats;
}
