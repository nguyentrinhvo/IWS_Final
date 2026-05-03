package com.example.demo.dto.hotel;

import com.example.demo.document.embed.ImageEmbed;
import com.example.demo.document.embed.RoomType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String address;

    @NotBlank(message = "City is required")
    private String city;

    private String country;

    @NotNull(message = "Star rating is required")
    private Integer starRating;

    private String description;
    private String thumbnailUrl;
    private List<ImageEmbed> images;
    private List<String> amenities;
    private Double latitude;
    private Double longitude;
    private Double avgRating;
    private List<RoomType> roomTypes;
    private Boolean isActive;
}
