package com.moviebooking.paymentservice.controller;

import com.moviebooking.paymentservice.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestParam String bookingId, @RequestParam String userEmail) {

        // Simulating 3rd party payment gateway logic here...
        boolean paymentSuccessful = true;

        if (paymentSuccessful) {
            String message = "BookingId:" + bookingId + ",Email:" + userEmail;

            // Send message to RabbitMQ
            rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_NAME, message);

            return ResponseEntity.ok("Payment successful! Notification process initiated.");
        }
        return ResponseEntity.badRequest().body("Payment failed.");
    }
}