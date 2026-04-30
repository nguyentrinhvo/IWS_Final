package com.example.demo.dto.review;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private String id;
    private String serviceId;
    private String serviceType;
    private String userId;
    private String bookingId;
    private Integer rating;
    private String content;
    private List<String> images;
    private Boolean isHidden;
    private String snapshotUserName;
    private String snapshotAvatarUrl;
    private Date createdAt;
}
