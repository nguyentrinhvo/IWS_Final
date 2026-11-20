package com.example.demo.dto.hotel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotelStatsDTO {
    private long totalHotels;
    private long activeHotels;
    private long totalRoomTypes;
    private long totalAvailableRooms;
}
