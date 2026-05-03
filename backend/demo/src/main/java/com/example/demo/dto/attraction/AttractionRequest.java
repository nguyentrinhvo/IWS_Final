package com.example.demo.dto.attraction;

import com.example.demo.document.embed.ImageEmbed;
import com.example.demo.document.embed.OpeningHours;
import com.example.demo.document.embed.TicketType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionRequest {
    @NotBlank(message = "Vietnamese name is required")
    private String nameVi;

    private String nameEn;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Attraction type is required")
    private String attractionType;     // "entertainment" | "nature" | "culture"

    private String descriptionVi;
    private String descriptionEn;
    private String thumbnailUrl;
    private List<ImageEmbed> images;
    private OpeningHours openingHours;
    private List<TicketType> ticketTypes;
    private Boolean isActive;
}
