package com.moviebooking.bookingservice.controller;

import com.moviebooking.bookingservice.service.SeatLockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private SeatLockService seatLockService;

    // Endpoint to click a seat and lock it
    @PostMapping("/lock")
    public ResponseEntity<String> lockSeat(@RequestParam String showId,
                                           @RequestParam String seatNumber,
                                           @RequestParam String userId) {
        boolean isLocked = seatLockService.lockSeat(showId, seatNumber, userId);

        if (isLocked) {
            return ResponseEntity.ok("Seat locked successfully for 10 minutes.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Seat is already locked by another user.");
        }
    }
    @PostMapping("/confirm")
    public ResponseEntity<String> confirmBooking(@RequestParam String showId,
                                                 @RequestParam String seatNumber,
                                                 @RequestParam String userId) {
        boolean isConfirmed = seatLockService.confirmBooking(showId, seatNumber, userId);

        if (isConfirmed) {
            return ResponseEntity.ok("Booking confirmed and saved to database!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Booking failed. Lock expired or invalid user.");
        }
    }

    // Endpoint to manually release the lock (e.g., user clicks 'Cancel')
    @PostMapping("/unlock")
    public ResponseEntity<String> unlockSeat(@RequestParam String showId,
                                             @RequestParam String seatNumber,
                                             @RequestParam String userId) {
        seatLockService.unlockSeat(showId, seatNumber, userId);
        return ResponseEntity.ok("Seat unlocked successfully.");
    }
}