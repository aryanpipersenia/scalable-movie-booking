import { useState } from 'react';
import apiClient from '../api/axiosConfig';
import { useParams } from 'react-router-dom';

export default function SeatSelection() {
    const { movieId } = useParams();
    const [lockedSeat, setLockedSeat] = useState(null);

    const lockSeat = async (seatNumber) => {
        try {
            // Call the Booking Service through the Gateway
            // Hardcoding userId 'user123' for this demo
            await apiClient.post(`/api/bookings/lock?showId=${movieId}&seatNumber=${seatNumber}&userId=user123`);
            
            setLockedSeat(seatNumber);
            alert(`Seat ${seatNumber} locked for 10 minutes! Proceed to payment.`);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(`Sorry, Seat ${seatNumber} is currently locked by another user.`);
            } else {
                alert("Error locking seat.");
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Select Your Seat</h2>
            <p>Click a seat to lock it via Redis:</p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                {['A1', 'A2', 'A3', 'A4'].map(seat => (
                    <button 
                        key={seat}
                        onClick={() => lockSeat(seat)}
                        style={{ 
                            padding: '20px', 
                            backgroundColor: lockedSeat === seat ? 'green' : 'lightgray' 
                        }}
                    >
                        {seat}
                    </button>
                ))}
            </div>

            {lockedSeat && (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => alert("Payment sent to RabbitMQ!")}>
                        Pay Now
                    </button>
                </div>
            )}
        </div>
    );
}