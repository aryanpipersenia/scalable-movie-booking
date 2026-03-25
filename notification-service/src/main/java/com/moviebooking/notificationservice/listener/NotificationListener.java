package com.moviebooking.notificationservice.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    @RabbitListener(queues = "payment_completed_queue")
    public void handlePaymentCompletion(String message) {
        // In a real app, you would parse the message and use JavaMailSender here
        System.out.println("=========================================================");
        System.out.println("RABBITMQ MESSAGE RECEIVED!");
        System.out.println("Sending confirmation email/SMS for details: " + message);
        System.out.println("=========================================================");
    }
}