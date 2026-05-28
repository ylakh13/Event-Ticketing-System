package com.eventticketing.controller;

import com.eventticketing.dto.AdminUserResponse;
import com.eventticketing.dto.EventResponse;
import com.eventticketing.dto.PlatformAnalyticsResponse;
import com.eventticketing.dto.UpdateUserRoleRequest;
import com.eventticketing.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public List<AdminUserResponse> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/events")
    public List<EventResponse> getAllEvents() {
        return adminService.getAllEvents();
    }

    @PutMapping("/users/{userId}/role")
    public AdminUserResponse updateUserRole(@PathVariable Long userId, @Valid @RequestBody UpdateUserRoleRequest request) {
        return adminService.updateUserRole(userId, request);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/events/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        adminService.deleteEvent(eventId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/analytics")
    public PlatformAnalyticsResponse getPlatformAnalytics() {
        return adminService.getPlatformAnalytics();
    }

}
