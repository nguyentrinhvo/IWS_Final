package com.example.demo.document.embed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passenger {
    private String fullName;
    private String identityNumber; // CMND/Hộ chiếu
    private String nationality;
    private String seatPosition; // Optional: Seat position if applicable (e.g. "A1")
}
