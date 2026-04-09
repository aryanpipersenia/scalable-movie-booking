import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLanding from './components/AuthLanding'; // <-- New import
import MovieList from './components/MovieList';
import SeatSelection from './components/SeatSelection';

function App() {
    return (
        <Router>
            <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto' }}>
                <Routes>
                    {/* Send users to the new Auth Landing first */}
                    <Route path="/" element={<Navigate to="/auth" />} />
                    
                    {/* The unified Auth component handles Login, Signup, and Forgot Password */}
                    <Route path="/auth" element={<AuthLanding />} />
                    
                    <Route path="/movies" element={<MovieList />} />
                    <Route path="/book/:movieId" element={<SeatSelection />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;