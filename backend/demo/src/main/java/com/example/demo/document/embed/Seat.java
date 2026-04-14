package com.example.demo.document.embed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {
    private String position;           // "A1", "B3"
    private Integer floor;             // 1, 2
    private String status;             // "available" | "booked"
}
