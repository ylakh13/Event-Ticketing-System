package com.eventticketing.service;

import com.eventticketing.dto.AuthResponse;
import com.eventticketing.dto.LoginRequest;
import com.eventticketing.dto.RegisterRequest;
import com.eventticketing.entity.Role;
import com.eventticketing.entity.User;
import com.eventticketing.exception.BusinessRuleException;
import com.eventticketing.repository.UserRepository;
import com.eventticketing.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail().toLowerCase().trim()).isPresent()) {
            throw new BusinessRuleException("Email already exists");
        }

        Role role = request.getRole();

        if(role == Role.ROLE_ADMIN) {
            throw new BusinessRuleException("Admin registration is not allowed");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase().trim())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(role)
                .build();

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        List.of()
                )
        );

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if(!passwordMatches) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String jwtToken = jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        List.of()
                )
        );

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
