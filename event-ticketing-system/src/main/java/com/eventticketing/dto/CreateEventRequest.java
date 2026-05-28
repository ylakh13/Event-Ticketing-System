package com.eventticketing.dto;


import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateEventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Event date and time is required")
    @Future(message = "Event date and time must be in the future")
    private LocalDateTime dateTime;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Ticket price is required")
    @DecimalMin(
            value="0.0",
            inclusive=false,
            message="Ticket price must be greater than 0"
    )
    private BigDecimal ticketPrice;

    @NotNull(message = "Total tickets is required")
    @Min(
            value = 1,
            message = "Atleast 1 ticket is required"
    )
    private Integer totalTicketsAvailable;
}
