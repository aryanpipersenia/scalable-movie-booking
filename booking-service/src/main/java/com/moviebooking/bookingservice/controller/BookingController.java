package com.moviebooking.bookingservice.controller;

import com.moviebooking.bookingservice.entity.Booking;
import com.moviebooking.bookingservice.entity.Ticket;
import com.moviebooking.bookingservice.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private TicketRepository repository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getUserBookings(@PathVariable String userId) {
        // Now the return type perfectly matches what your repository gives back!
        return ResponseEntity.ok(repository.findByUserId(userId));
    }

    // 1. BUY A TICKET (Generates the UUID for the QR Code)
    @PostMapping("/purchase")
    public ResponseEntity<Ticket> purchaseTicket(@RequestBody Ticket ticketRequest) {
        // In a real app, you verify the Razorpay payment ID here first!
        Ticket savedTicket = repository.save(ticketRequest);
        return ResponseEntity.ok(savedTicket);
    }

    // 2. FETCH USER'S TICKETS
    @GetMapping("/my-tickets/{userId}")
    public ResponseEntity<List<Ticket>> getUserTickets(@PathVariable String userId) {
        return ResponseEntity.ok(repository.findByUserId(userId));
    }

    // 3. THE SECURITY GATE SCANNER (The State Machine)
    @PostMapping("/validate/{ticketId}")
    public ResponseEntity<String> validateTicketAtGate(@PathVariable String ticketId) {
        Optional<Ticket> ticketOpt = repository.findById(ticketId);

        if (ticketOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: Ticket not found!");
        }

        Ticket ticket = ticketOpt.get();

        if ("ISSUED".equals(ticket.getStatus())) {
            ticket.setStatus("SCANNED_ENTERED");
            repository.save(ticket);
            return ResponseEntity.ok("SUCCESS: Access Granted!");
        } else if ("SCANNED_ENTERED".equals(ticket.getStatus())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("ACCESS DENIED: Ticket already used!");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ticket state.");
    }
}