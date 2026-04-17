package com.moviebooking.catalogservice.repository;

import com.moviebooking.catalogservice.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByStatus(String status);
}