package com.eventticketing.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlatformAnalyticsResponse {

    private Long totalUsers;

    private Long totalEvents;

    private Integer totalTicketsSold;

    private BigDecimal totalRevenue;
}
