package com.moviebooking.bookingservice.repository;

import com.moviebooking.bookingservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, String> {
    List<Ticket> findByUserId(String userId); // For the user's "My Tickets" page
    List<Ticket> findByEventId(int eventId); // For the Organizer's Dashboard
}