package com.example.demo.document.embed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourImage {
    private String url;
    private Boolean isThumbnail;
    private Integer order;
}
