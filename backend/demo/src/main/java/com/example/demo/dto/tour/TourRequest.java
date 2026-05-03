package com.example.demo.dto.tour;

import com.example.demo.document.embed.Departure;
import com.example.demo.document.embed.Itinerary;
import com.example.demo.document.embed.TourImage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Data;

@Data
public class TourRequest {
    private String categoryId;
    
    @NotBlank(message = "VI name is required")
    private String nameVi;

    @NotBlank(message = "EN name is required")
    private String nameEn;

    private String descriptionVi;
    private String descriptionEn;

    @NotBlank(message = "Tour type is required")
    private String tourType;

    @NotNull(message = "Adult price is required")
    private Double priceAdult;

    private Double priceChild;

    @NotNull(message = "Duration days is required")
    private Integer durationDays;

    private String departureCity;
    private String destination;
    private String country;
    private Boolean requireVisa;
    private String visaInfo;
    private Integer maxCapacity;
    private Boolean isActive;
    
    private List<TourImage> images;
    private List<Itinerary> itinerary;
    private List<Departure> departures;
}
