package com.eventticketing.dto;

import com.eventticketing.entity.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminUserResponse {

    private Long id;

    private String name;

    private String email;

    private Role role;

}
