package com.example.demo.document.embed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketType {
    private String typeName;           // "Single", "Combo", "VIP", "Child"
    private Double price;              // VND
    private String description;
    private Integer availableQuantity; // null = unlimited
    private Boolean isAvailable;
}
