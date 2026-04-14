package com.example.demo.document;

import com.example.demo.document.embed.ImageEmbed;
import com.example.demo.document.embed.OpeningHours;
import com.example.demo.document.embed.TicketType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attractions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionDocument {
    @Id
    private String id;

    @Indexed
    private String nameVi;

    @Indexed
    private String nameEn;

    @Indexed
    private String location;

    @Indexed
    private String attractionType;     // "entertainment" | "nature" | "culture"

    private String descriptionVi;
    private String descriptionEn;
    private String thumbnailUrl;

    // EMBEDDED
    private List<ImageEmbed> images;
    private OpeningHours openingHours;
    private List<TicketType> ticketTypes;

    private Double avgRating;
    private Boolean isActive;
}
