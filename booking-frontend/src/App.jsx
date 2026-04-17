import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyTickets from './pages/MyTickets';
import AuthLanding from './pages/AuthLanding';
import EventDashboard from './pages/EventDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard'; // <-- IMPORT THIS

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<AuthLanding />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/movies" element={<EventDashboard />} />
          <Route path="/organizer" element={<OrganizerDashboard />} /> {/* <-- ADD THIS ROUTE */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;