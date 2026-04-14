package com.example.demo.document;

import com.example.demo.document.embed.ImageEmbed;
import com.example.demo.document.embed.RoomType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hotels")
@CompoundIndex(name = "idx_hotel_city_star", def = "{'city': 1, 'starRating': 1}")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelDocument {
    @Id
    private String id;

    @Indexed
    private String name;
    private String address;

    @Indexed
    private String city;

    @Indexed
    private String country;

    @Indexed
    private Integer starRating;

    private String description;
    private String thumbnailUrl;

    // EMBEDDED
    private List<ImageEmbed> images;
    private List<String> amenities;

    private Double latitude;
    private Double longitude;
    private Double avgRating;

    // EMBEDDED
    private List<RoomType> roomTypes;

    private Boolean isActive;
}
