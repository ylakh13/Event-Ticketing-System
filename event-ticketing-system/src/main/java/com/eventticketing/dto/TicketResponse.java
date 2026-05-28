package com.eventticketing.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketResponse {

    private Long ticketId;

    private String uniqueCode;

    private String eventTitle;

    private LocalDateTime eventDateTime;

    private String eventLocation;

    private Long orderId;
}
