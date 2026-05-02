package com.example.demo.dto.attraction;

import com.example.demo.document.embed.ImageEmbed;
import com.example.demo.document.embed.OpeningHours;
import com.example.demo.document.embed.TicketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionDTO {
    private String id;
    private String nameVi;
    private String nameEn;
    private String location;
    private String attractionType;     // "entertainment" | "nature" | "culture"
    private String descriptionVi;
    private String descriptionEn;
    private String thumbnailUrl;
    private List<ImageEmbed> images;
    private OpeningHours openingHours;
    private List<TicketType> ticketTypes;
    private Double avgRating;
    private Boolean isActive;
    // Derived: min ticket price for display
    private Double minPrice;
}
