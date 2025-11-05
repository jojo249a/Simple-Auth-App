package com.jojo.test.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Size(min = 5, message = "Password must be at least 5 characters")
    private String password;
    
    @NotBlank(message = "Password confirmation is required")
    private String passwordConfirmation;
}
