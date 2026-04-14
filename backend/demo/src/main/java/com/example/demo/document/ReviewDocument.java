package com.example.demo.document;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
@CompoundIndex(name = "idx_review_service", def = "{'serviceId': 1, 'serviceType': 1}")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDocument {
    @Id
    private String id;

    @Indexed
    private String serviceId;

    @Indexed
    private String serviceType;       // "tour" | "hotel" | "attraction" | "flight"

    @Indexed
    private String userId;
    private String bookingId;

    @Indexed
    private Integer rating;
    private String content;
    private List<String> images;

    @Indexed
    private Boolean isHidden;

    // SNAPSHOT
    private String snapshotUserName;
    private String snapshotAvatarUrl;

    @Indexed
    private Date createdAt;
}
