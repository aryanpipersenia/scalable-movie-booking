package com.moviebooking.catalogservice.controller;

import com.moviebooking.catalogservice.entity.Movie;
import com.moviebooking.catalogservice.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;
//for admins
    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    // Endpoint for Users to browse all movies
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}