package com.moviebooking.bookingservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tickets")
public class Ticket {

    @Id
    private String id; // We will use UUIDs for secure QR codes

    private int eventId;
    private String userId; // The person who bought it
    private double amountPaid;

    private String status; // "ISSUED", "SCANNED_ENTERED", "CANCELLED"
    private LocalDateTime purchaseDate;

    // Run this automatically before saving to MySQL
    @PrePersist
    protected void onCreate() {
        this.id = UUID.randomUUID().toString();
        this.purchaseDate = LocalDateTime.now();
        this.status = "ISSUED";
    }
}