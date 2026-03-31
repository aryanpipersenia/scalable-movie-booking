package com.moviebooking.identityservice.controller;

import com.moviebooking.identityservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String role) {
        // In a real scenario, you verify the password in MySQL here first!
        return jwtService.generateToken(username, role);
    }
}