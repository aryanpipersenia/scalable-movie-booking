import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Call the Catalog Service through the Gateway
        apiClient.get('/api/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies", error));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Now Showing</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                {movies.map(movie => (
                    <div key={movie.id} style={{ border: '1px solid gray', padding: '15px' }}>
                        <h3>{movie.title}</h3>
                        <p>{movie.genre} | {movie.durationMinutes} mins</p>
                        <button onClick={() => navigate(`/book/${movie.id}`)}>
                            Book Seats
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}