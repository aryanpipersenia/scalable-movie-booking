package com.moviebooking.catalogservice;

import com.moviebooking.catalogservice.entity.Event;
import com.moviebooking.catalogservice.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CatalogServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatalogServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadDummyData(EventRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				repository.save(new Event(0, "KIET Tech Fest 2026", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", "Annual college hackathon.", "Tech", "2026-10-15", 480, "aryan_admin", "LIVE", 250.0, 500, false));
				repository.save(new Event(0, "Avengers: Secret Wars", "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe", "Marvel crossover event.", "Movie", "2027-05-07", 180, "aryan_admin", "LIVE", 400.0, 100, true));
				repository.save(new Event(0, "Zakir Khan Live", "https://images.unsplash.com/photo-1514525253361-b83f859b71c2", "Relatable stand-up comedy.", "Comedy", "2026-11-20", 90, "aryan_admin", "LIVE", 799.0, 200, false));
				repository.save(new Event(0, "Standup Night", "https://images.unsplash.com/photo-1585699324551-f6c309eedee5", "Local comedy talent search.", "Comedy", "2026-12-05", 120, "aryan_admin", "LIVE", 199.0, 50, false));
			}
		};
	}
}