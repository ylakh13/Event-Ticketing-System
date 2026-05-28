package com.eventticketing.dto;

import com.eventticketing.entity.Role;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserRoleRequest {

    @NotNull(message = "Role is required")
    private Role role;

}
