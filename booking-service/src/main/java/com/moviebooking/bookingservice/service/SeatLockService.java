package com.moviebooking.bookingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class SeatLockService {

    @Autowired
    private StringRedisTemplate redisTemplate;

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
}