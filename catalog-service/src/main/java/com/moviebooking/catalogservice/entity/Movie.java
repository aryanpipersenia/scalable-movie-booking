package com.moviebooking.catalogservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Integer durationMinutes;
    private String language;
    private String genre;

}
