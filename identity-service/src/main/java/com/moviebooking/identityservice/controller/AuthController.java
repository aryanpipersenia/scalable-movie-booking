package com.moviebooking.identityservice.controller;

import com.moviebooking.identityservice.entity.UserCredential;
import com.moviebooking.identityservice.repository.UserCredentialRepository;
import com.moviebooking.identityservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserCredentialRepository repository;

    // 1. THE NEW REGISTRATION ENDPOINT
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserCredential user) {
        // Check if username already exists
        if (repository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists!");
        }

        // Force default role to USER if they didn't provide one
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // Save to MySQL
        repository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // 2. THE UPDATED LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {

        // Fetch user from database
        Optional<UserCredential> userOptional = repository.findByUsername(username);

        // Verify username and password match
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            // Generate token using their actual database role
            String token = jwtService.generateToken(username, userOptional.get().getRole());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}