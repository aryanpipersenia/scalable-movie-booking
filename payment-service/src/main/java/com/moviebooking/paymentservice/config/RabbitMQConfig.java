package com.moviebooking.paymentservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_NAME = "payment_completed_queue";

    @Bean
    public Queue paymentQueue() {
        // Creates a durable queue that survives server restarts
        return new Queue(QUEUE_NAME, true);
    }
}