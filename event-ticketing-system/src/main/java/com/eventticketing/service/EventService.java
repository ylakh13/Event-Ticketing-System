package com.eventticketing.service;

import com.eventticketing.dto.AttendeeResponse;
import com.eventticketing.dto.CreateEventRequest;
import com.eventticketing.dto.EventResponse;
import com.eventticketing.dto.OrganizerDashboardResponse;
import com.eventticketing.entity.Event;
import com.eventticketing.entity.Ticket;
import com.eventticketing.entity.User;
import com.eventticketing.repository.EventRepository;
import com.eventticketing.repository.TicketRepository;
import com.eventticketing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final UserRepository userRepository;

    private final EventRepository eventRepository;

    private final TicketRepository ticketRepository;

    public EventResponse createEvent(CreateEventRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userEmail = authentication.getName();

        User organizer = userRepository.findByEmail(userEmail);

        if(organizer == null) {
            throw new RuntimeException("User not found");
        }

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dateTime(request.getDateTime())
                .location(request.getLocation())
                .ticketPrice(request.getTicketPrice())
                .totalTicketsAvailable(request.getTotalTicketsAvailable())
                .organizer(organizer)
                .build();

        Event savedEvent = eventRepository.save(event);

        return mapToEventResponse(savedEvent);
    }

    public EventResponse getEventById(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return mapToEventResponse(event);
    }

    public EventResponse updateEvent(Long eventId, CreateEventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        String currentUserEmail = getCurrentUserEmail();

        if(!event.getOrganizer().getEmail().equals(currentUserEmail)) {
            throw new RuntimeException("You are not authorized to update this event");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDateTime(request.getDateTime());
        event.setLocation(request.getLocation());
        event.setTicketPrice(request.getTicketPrice());
        event.setTotalTicketsAvailable(request.getTotalTicketsAvailable());

        Event updatedEvent = eventRepository.save(event);

        return mapToEventResponse(updatedEvent);
    }

    public List<EventResponse> getMyEvents() {
        String currentUserEmail = getCurrentUserEmail();

        User organizer = userRepository.findByEmail(currentUserEmail);

        if(organizer == null) {
            throw new RuntimeException("User not found");
        }

        List<Event> events = eventRepository.findByOrganizer(organizer);

        return events.stream()
                .map(this::mapToEventResponse)
                .toList();
    }

    public void deleteEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String currentUserEmail = getCurrentUserEmail();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        boolean isOrganizer = event.getOrganizer().getEmail().equals(currentUserEmail);

        if(!isAdmin && !isOrganizer) {
            throw new RuntimeException("You are not authorized to delete this event");
        }

        eventRepository.delete(event);
    }

    public Page<EventResponse> getAllEvents(
            String title,
            String location,
            LocalDate date,
            Pageable pageable
    ) {
        Specification<Event> spec = (root, query, criteriaBuilder) ->
                criteriaBuilder.conjunction();

        if (title != null && !title.isBlank()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("title")),
                            "%" + title.toLowerCase() + "%"
                    )
            );
        }

        if (location != null && !location.isBlank()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("location")),
                            "%" + location.toLowerCase() + "%"
                    )
            );
        }

        if (date != null) {
            LocalDateTime startDateTime = date.atStartOfDay();
            LocalDateTime endDateTime = date.plusDays(1).atStartOfDay();

            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.between(
                            root.get("dateTime"),
                            startDateTime,
                            endDateTime
                    )
            );
        }

        Page<Event> events = eventRepository.findAll(spec, pageable);

        return events.map(this::mapToEventResponse);
    }

    public OrganizerDashboardResponse getOrganizerDashboard(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        String currentUserEmail = getCurrentUserEmail();

        if (!event.getOrganizer().getEmail().equals(currentUserEmail)) {
            throw new RuntimeException(
                    "You are not authorized to view this dashboard"
            );
        }

        BigDecimal totalRevenue = event.getTicketPrice().multiply(BigDecimal.valueOf(event.getTicketsSold()));

        return OrganizerDashboardResponse.builder()
                .eventId(event.getId())
                .eventTitle(event.getTitle())
                .ticketsSold(event.getTicketsSold())
                .totalTicketsAvailable(event.getTotalTicketsAvailable())
                .totalRevenue(totalRevenue)
                .build();
    }

    public List<AttendeeResponse> getEventAttendees(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        String currentUserEmail = getCurrentUserEmail();

        if (!event.getOrganizer().getEmail().equals(currentUserEmail)) {
            throw new RuntimeException(
                    "You are not authorized to view this attendee list"
            );
        }

        List<Ticket> tickets = ticketRepository.findByEvent(event);

        return tickets.stream()
                .map(
                        ticket -> AttendeeResponse.builder()
                                .ticketId(ticket.getId())
                                .ticketCode(ticket.getUniqueCode())
                                .attendeeName(ticket.getOrder().getUser().getName())
                                .attendeeEmail(ticket.getOrder().getUser().getEmail())
                                .orderId(ticket.getOrder().getId())
                                .build()
                )
                .toList();
    }

    private EventResponse mapToEventResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .dateTime(event.getDateTime())
                .location(event.getLocation())
                .ticketPrice(event.getTicketPrice())
                .totalTicketsAvailable(event.getTotalTicketsAvailable())
                .organizerName(event.getOrganizer().getName())
                .ticketsSold(event.getTicketsSold())
                .build();
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
