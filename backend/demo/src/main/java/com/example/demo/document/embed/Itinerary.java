package com.example.demo.document.embed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Itinerary {
    private Integer day;
    private String titleVi;
    private String titleEn;
    private String descriptionVi;
    private String descriptionEn;
}
