package com.example.demo.dto.tour;

import com.example.demo.document.embed.Departure;
import com.example.demo.document.embed.Itinerary;
import com.example.demo.document.embed.TourImage;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class TourDTO {
    private String id;
    private String categoryId;
    private String nameVi;
    private String nameEn;
    private String descriptionVi;
    private String descriptionEn;
    private String tourType;
    private Double priceAdult;
    private Double priceChild;
    private Integer durationDays;
    private String departureCity;
    private String destination;
    private String country;
    private Boolean requireVisa;
    private String visaInfo;
    private Integer maxCapacity;
    private Double avgRating;
    private Integer totalReviews;
    private List<TourImage> images;
    private List<Itinerary> itinerary;
    private List<Departure> departures;
    private Date createdAt;
    private Date updatedAt;
}
