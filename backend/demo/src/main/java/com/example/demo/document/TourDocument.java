package com.example.demo.document;

import com.example.demo.document.embed.Departure;
import com.example.demo.document.embed.Itinerary;
import com.example.demo.document.embed.TourImage;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourDocument {
    @Id
    private String id;

    private String categoryId;

    @Indexed
    private String nameVi;

    @Indexed
    private String nameEn;

    private String descriptionVi;
    private String descriptionEn;

    @Indexed
    private String tourType;          // "domestic" | "international"

    @Indexed
    private Double priceAdult;
    private Double priceChild;

    @Indexed
    private Integer durationDays;
    private String departureCity;

    @Indexed
    private String destination;

    @Indexed
    private String country;
    private Boolean requireVisa;
    private String visaInfo;
    private Integer maxCapacity;
    private Double avgRating;
    private Integer totalReviews;

    @Indexed
    private Boolean isDeleted;

    // EMBEDDED
    private List<TourImage> images;
    private List<Itinerary> itinerary;
    private List<Departure> departures;

    private Date createdAt;
    private Date updatedAt;
}
