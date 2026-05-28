package com.eventticketing.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizerDashboardResponse {

    private Long eventId;

    private String eventTitle;

    private Integer ticketsSold;

    private Integer totalTicketsAvailable;

    private BigDecimal totalRevenue;
}
