package com.eventticketing.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendeeResponse {

    private Long ticketId;

    private String ticketCode;

    private String attendeeName;

    private String attendeeEmail;

    private Long orderId;
}
