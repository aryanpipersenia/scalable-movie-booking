package com.moviebooking.paymentservice.controller;

import com.moviebooking.paymentservice.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // THE NEW PAY-TO-LIST ENDPOINT
    @PostMapping("/listing-fee")
    public ResponseEntity<String> payListingFee(@RequestParam String showId, @RequestParam String organizerId) {

        // 1. Mock the payment gateway logic (Stripe, Razorpay, etc.)
        System.out.println("Processing ₹500 listing fee for Organizer: " + organizerId);
        boolean paymentSuccessful = true; // Pretend it succeeded

        if (paymentSuccessful) {
            // 2. Drop a message in RabbitMQ telling the Catalog to wake up!
            // We are sending just the showId to a specific queue.
            rabbitTemplate.convertAndSend("show-activation-queue", showId);

            return ResponseEntity.ok("Payment successful! Your show is now live.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment failed.");
        }
    }}