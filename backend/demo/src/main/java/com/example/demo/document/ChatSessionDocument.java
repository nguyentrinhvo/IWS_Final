package com.example.demo.document;

import com.example.demo.document.embed.ChatMessage;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatSessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatSessionDocument {
    @Id
    private String id;

    @Indexed
    private String userId;
    private Boolean isTransferredToAgent;

    @Indexed
    private String status;           // "open" | "closed"

    private Date startedAt;
    private Date endedAt;

    // EMBEDDED
    private List<ChatMessage> messages;
}
