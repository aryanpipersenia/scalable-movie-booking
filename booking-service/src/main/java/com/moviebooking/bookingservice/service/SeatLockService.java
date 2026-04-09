package com.moviebooking.bookingservice.service;

import com.moviebooking.bookingservice.entity.Booking;
import com.moviebooking.bookingservice.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class SeatLockService {

    @Autowired
    private StringRedisTemplate redisTemplate;
    @Autowired
    private BookingRepository bookingRepository;

    // This locks the seat for exactly 10 minutes
    public boolean lockSeat(String showId, String seatNumber, String userId) {
        String lockKey = "LOCK:SHOW:" + showId + ":SEAT:" + seatNumber;

        // setIfAbsent is the magic method. It translates to Redis SETNX.
        // It only sets the value if the key does NOT exist.
        Boolean acquired = redisTemplate.opsForValue()
                .setIfAbsent(lockKey, userId, Duration.ofMinutes(10));

        return acquired != null && acquired;
    }

    // This releases the lock (called if they cancel, or after successful payment)
    public void unlockSeat(String showId, String seatNumber, String userId) {
        String lockKey = "LOCK:SHOW:" + showId + ":SEAT:" + seatNumber;

        // Only unlock if the person who locked it is the one trying to unlock it
        String currentLockOwner = redisTemplate.opsForValue().get(lockKey);
        if (userId.equals(currentLockOwner)) {
            redisTemplate.delete(lockKey);
        }
    }
    public boolean confirmBooking(String showId, String seatNumber, String userId) {
        String lockKey = "LOCK:SHOW:" + showId + ":SEAT:" + seatNumber;
        String currentLockOwner = redisTemplate.opsForValue().get(lockKey);

        // Security check: Does this user actually own the lock right now?
        if (userId.equals(currentLockOwner)) {
            // 1. Save permanent ticket to MySQL
            Booking newBooking = new Booking();
            newBooking.setUserId(userId);
            newBooking.setShowId(showId);
            newBooking.setSeatNumber(seatNumber);
            newBooking.setStatus("CONFIRMED");
            bookingRepository.save(newBooking);

            // 2. Delete the Redis lock so it doesn't expire and become available again
            redisTemplate.delete(lockKey);

            return true;
        }
        return false; // User didn't have the lock, or it expired!
    }
}