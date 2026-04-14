package com.example.demo.document.embed;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private String sender;             // "user" | "bot" | "agent"
    private String content;
    private String fileUrl;
    private Date sentAt;
}
