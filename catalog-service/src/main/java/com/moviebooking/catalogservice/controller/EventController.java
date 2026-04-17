package com.moviebooking.catalogservice.controller;

import com.moviebooking.catalogservice.entity.Event;
import com.moviebooking.catalogservice.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository repository;

    // 1. ORGANIZER ADDS AN EVENT
    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {

        // FIX 1: Change status from PENDING to LIVE so it shows on the UI instantly
        event.setStatus("LIVE");

        // FIX 2: Set a beautiful default image if the organizer leaves the URL blank
        if (event.getImageUrl() == null || event.getImageUrl().trim().isEmpty()) {
            event.setImageUrl("https://picsum.photos/seed/" + event.getCategory() + "/800/400");
        }

        Event savedEvent = repository.save(event);
        return ResponseEntity.ok(savedEvent);
    }

    // 2. FETCH ALL LIVE EVENTS (For the Homepage)
    @GetMapping("/live")
    public ResponseEntity<List<Event>> getLiveEvents() {
        return ResponseEntity.ok(repository.findByStatus("LIVE"));
    }
}