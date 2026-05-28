package com.eventticketing.dto;


import com.eventticketing.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;

    private Long userId;

    private String name;

    private String email;

    private Role role;
}
