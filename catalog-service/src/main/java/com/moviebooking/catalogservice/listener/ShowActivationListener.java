package com.moviebooking.catalogservice.listener;

import com.moviebooking.catalogservice.entity.Event;
import com.moviebooking.catalogservice.repository.EventRepository;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ShowActivationListener {

    @Autowired
    private EventRepository repository;

    // Listen to the specific queue. The @Queue annotation auto-creates it if it doesn't exist!
    @RabbitListener(queuesToDeclare = @Queue("show-activation-queue"))
    public void activateShow(String showIdAsString) {
        System.out.println("Received activation request for Show ID: " + showIdAsString);

        try {
            int showId = Integer.parseInt(showIdAsString);
            Optional<Event> movieOptional = repository.findById(showId);

            if (movieOptional.isPresent()) {
                Event movie = movieOptional.get();

                // Flip the switch!
                movie.setStatus("LIVE");
                repository.save(movie);

                System.out.println("SUCCESS: Show ID " + showId + " is now LIVE on the platform!");
            } else {
                System.out.println("ERROR: Could not find Show ID " + showId);
            }
        } catch (Exception e) {
            System.out.println("ERROR: Failed to process activation message.");
        }
    }
}