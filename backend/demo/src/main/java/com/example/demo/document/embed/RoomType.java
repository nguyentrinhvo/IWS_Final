package com.example.demo.document.embed;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {
    private String typeName;           // "Single", "Double", "Suite"
    private Double pricePerNight;      // VND
    private Integer maxGuests;
    private Integer availableRooms;
    private List<String> amenities;    // ["ac", "minibar"]
    private String imageUrl;
}
