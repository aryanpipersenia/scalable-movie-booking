package com.moviebooking.notificationservice.listener;

import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    // queuesToDeclare tells Spring: "If this queue is missing, create it right now."
    @RabbitListener(queuesToDeclare = @Queue(name = "payment_completed_queue", durable = "true"))
    public void handlePaymentCompletion(String message) {
        System.out.println("=========================================================");
        System.out.println("RABBITMQ MESSAGE RECEIVED!");
        System.out.println("Sending confirmation email/SMS for details: " + message);
        System.out.println("=========================================================");
    }
}