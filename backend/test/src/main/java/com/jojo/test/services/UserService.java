package com.jojo.test.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jojo.test.models.User;
import com.jojo.test.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String name, String password, String email) {
        System.out.println("Raw name: " + name);
        System.out.println("Raw password: " + password);
        System.out.println("Raw email: " + email);
        String hashedPassword = passwordEncoder.encode(password);
        User user = User.builder()
                .name(name)
                .email(email)
                .password(hashedPassword)
                .build();
        return userRepository.save(user);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User updateUser(Long id, String name, String password) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setName(name);
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
        }
        return user;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
