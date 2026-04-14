package com.example.demo.document.embed;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpeningHours {
    private String openAt;             // "07:00"
    private String closeAt;            // "21:00"
    private List<String> closedDays;   // ["Monday"]
}
