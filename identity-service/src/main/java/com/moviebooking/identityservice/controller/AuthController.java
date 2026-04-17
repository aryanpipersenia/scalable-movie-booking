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
    private JwtService jwtService; // Assuming you have your JWT generation logic here

    @Autowired
    private UserCredentialRepository repository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserCredential user) {
        if (repository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists!");
        }

        // Everyone starts as a regular USER
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        repository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        Optional<UserCredential> userOptional = repository.findByUsername(username);

        // Check if user exists AND password matches
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            String token = jwtService.generateToken(username, userOptional.get().getRole());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}