package com.eventticketing.controller;

import com.eventticketing.dto.TicketResponse;
import com.eventticketing.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final OrderService orderService;

    @GetMapping("/me/tickets")
    @PreAuthorize("hasRole('USER')")
    public List<TicketResponse> getMyTickets() {
        return orderService.getMyTickets();
    }
}
