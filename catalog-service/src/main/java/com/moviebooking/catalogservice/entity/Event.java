package com.moviebooking.catalogservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String imageUrl; // NEW: Stores the link to the event banner
    private String description;
    private String category;
    private String eventDate;
    private int duration;

    private String organizerId;
    private String status;
    private double ticketPrice;
    private int totalCapacity;
    private boolean hasAssignedSeating;
}