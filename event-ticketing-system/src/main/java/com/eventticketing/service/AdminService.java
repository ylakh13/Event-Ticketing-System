package com.eventticketing.service;

import com.eventticketing.dto.AdminUserResponse;
import com.eventticketing.dto.EventResponse;
import com.eventticketing.dto.PlatformAnalyticsResponse;
import com.eventticketing.dto.UpdateUserRoleRequest;
import com.eventticketing.entity.Event;
import com.eventticketing.entity.User;
import com.eventticketing.repository.EventRepository;
import com.eventticketing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    private final EventRepository eventRepository;

    public List<AdminUserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> AdminUserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build())
                .toList();
    }

    public List<EventResponse> getAllEvents() {
        List<Event> events = eventRepository.findAll();

        return events.stream()
                .map(event -> EventResponse.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .dateTime(event.getDateTime())
                        .location(event.getLocation())
                        .ticketPrice(event.getTicketPrice())
                        .totalTicketsAvailable(event.getTotalTicketsAvailable())
                        .ticketsSold(event.getTicketsSold())
                        .organizerName(event.getOrganizer().getName())
                        .build())
                .toList();
    }

    public AdminUserResponse updateUserRole(Long userId, UpdateUserRoleRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        return AdminUserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
    }

    public void deleteEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        eventRepository.delete(event);
    }

    public PlatformAnalyticsResponse getPlatformAnalytics() {
        Long totalUsers = userRepository.count();

        List<Event> events = eventRepository.findAll();

        Long totalEvents = (long) events.size();

        Integer totalTicketsSold = events.stream()
                .mapToInt(Event::getTicketsSold)
                .sum();

        BigDecimal totalRevenue = events.stream()
                .map(event -> event.getTicketPrice().multiply(BigDecimal.valueOf(event.getTicketsSold())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return PlatformAnalyticsResponse.builder()
                .totalUsers(totalUsers)
                .totalEvents(totalEvents)
                .totalTicketsSold(totalTicketsSold)
                .totalRevenue(totalRevenue)
                .build();
    }

}
