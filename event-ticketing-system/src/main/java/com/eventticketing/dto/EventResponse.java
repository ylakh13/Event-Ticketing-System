package com.eventticketing.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private Long id;

    private String title;

    private String description;

    private LocalDateTime dateTime;

    private String location;

    private BigDecimal ticketPrice;

    private Integer totalTicketsAvailable;

    private String organizerName;

    private Integer ticketsSold;

}
