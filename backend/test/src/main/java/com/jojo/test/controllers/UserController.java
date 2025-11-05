package com.jojo.test.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jojo.test.dto.LoginRequest;
import com.jojo.test.dto.RegisterRequest;
import com.jojo.test.models.User;
import com.jojo.test.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }   
    
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

        if (!request.getPassword().equals(request.getPasswordConfirmation())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Passwords don't match."));
        }

        if (userService.emailExists(request.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists."));
        }

        String password = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(password)
                .build();

        userService.createUser(user);

        return ResponseEntity.ok(Map.of("message", "Account created successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        
        User user = userService.getUserByEmail(request.getEmail());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error","Invalid email or password."));
        }

        session.setAttribute("userId", user.getId());

        if (request.isRememberMe()) {
            session.setMaxInactiveInterval(60 * 60 * 24 * 30);
        } else {
            session.setMaxInactiveInterval(60 * 30);
        }

        return ResponseEntity.ok(Map.of(
            "message", "Logged in successfully.",
            "user", user
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();

        return ResponseEntity.ok().body(Map.of("message", "Logged out"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));
        }

        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}