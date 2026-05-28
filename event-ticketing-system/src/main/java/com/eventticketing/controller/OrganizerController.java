package com.eventticketing.controller;

import com.eventticketing.dto.AttendeeResponse;
import com.eventticketing.dto.EventResponse;
import com.eventticketing.dto.OrganizerDashboardResponse;
import com.eventticketing.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/organizers")
@RequiredArgsConstructor
public class OrganizerController {

    private final EventService eventService;

    @GetMapping("/events")
    @PreAuthorize("hasRole('ORGANIZER')")
    public List<EventResponse> getMyEvents() {
        return eventService.getMyEvents();
    }

    @GetMapping("/me/dashboard/{eventId}")
    @PreAuthorize("hasRole('ORGANIZER')")
    public OrganizerDashboardResponse getOrganizerDashboard(@PathVariable Long eventId) {
        return eventService.getOrganizerDashboard(eventId);
    }

    @GetMapping("/me/events/{eventId}/attendees")
    @PreAuthorize("hasRole('ORGANIZER')")
    public List<AttendeeResponse> getEventAttendees(@PathVariable Long eventId) {
        return eventService.getEventAttendees(eventId);
    }
}
