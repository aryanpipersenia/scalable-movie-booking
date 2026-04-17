import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { QRCodeSVG } from 'qrcode.react'; 
import apiClient from '../api/axiosConfig';

export default function EventDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTicket, setShowTicket] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/api/events/live');
                setEvents(response.data);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleBookTicket = (event) => {
        const options = {
            key: "rzp_test_SbjyvmGQIgUO7f", 
            amount: event.ticketPrice * 100, 
            currency: "INR",
            name: "TicketMaster Pro",
            description: `1x Ticket for ${event.title}`,
            theme: { color: "#E94560" },
            handler: async function (response) {
                try {
                    const ticketData = {
                        eventId: event.id,
                        userId: "1", 
                        amountPaid: event.ticketPrice
                    };
                    
                    const bookingRes = await apiClient.post('/api/bookings/purchase', ticketData);
                    
                    setActiveTicket({
                        ...bookingRes.data,
                        eventTitle: event.title
                    });
                    setShowTicket(true);
                } catch (err) {
                    console.error("Booking Service Error:", err);
                    alert("Payment Success, but could not reach Booking Service. Check console.");
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-darkBase text-white text-2xl font-bold">
                <span className="animate-pulse">Loading Live Events...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darkBase text-white p-8 relative">
            
            {/* --- HEADER WITH NAVIGATION BUTTONS --- */}
            <div className="max-w-7xl mx-auto mb-10 flex justify-between items-end border-b border-gray-700 pb-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Live Shows</h1>
                    <p className="text-gray-400 mt-2">Book tickets for the hottest events.</p>
                </div>
                
                <div className="flex space-x-6 items-center">
                    <button onClick={() => navigate('/organizer')} className="text-brand font-bold border border-brand px-4 py-2 rounded-lg hover:bg-brand hover:text-white transition-all">
                        + Create Event
                    </button>

                    {/* ADDED MY TICKETS BUTTON HERE */}
                    <button onClick={() => navigate('/tickets')} className="font-bold text-white hover:text-brand transition-colors">
                        🎟️ My Tickets
                    </button>

                    <button onClick={() => { localStorage.removeItem('jwt_token'); navigate('/'); }} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                        Logout
                    </button>
                </div>
            </div>

            {/* --- BEAUTIFUL EVENT GRID --- */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {events.map((evt) => (
                    <div key={evt.id} className="bg-darkCard rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
                        <div className="h-48 w-full bg-gray-800 relative">
                            {evt.imageUrl ? (
                                <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 font-bold">NO IMAGE</div>
                            )}
                            <span className="absolute top-3 left-3 bg-brand text-white text-xs font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                                {evt.category}
                            </span>
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold leading-tight mb-2">{evt.title}</h2>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{evt.description}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-300 font-medium mb-4 bg-gray-800/50 p-3 rounded-lg">
                                <span>📅 {evt.eventDate}</span>
                                <span>⏱️ {evt.duration}m</span>
                            </div>
                        </div>
                        <div className="p-5 border-t border-gray-700 flex justify-between items-center bg-gray-900/30">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Starting at</span>
                                <span className="text-2xl font-black text-white">₹{evt.ticketPrice}</span>
                            </div>
                            <button 
                                onClick={() => handleBookTicket(evt)}
                                className="bg-brand hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(233,69,96,0.4)]"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State Fallback */}
            {events.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-xl font-semibold">No live events found.</p>
                    <p>Click '+ Create Event' to add one!</p>
                </div>
            )}

            {/* --- THE INDUSTRY GRADE QR MODAL --- */}
            {showTicket && activeTicket && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white text-darkBase p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-center mb-6">
                            <QRCodeSVG value={activeTicket.id} size={200} level="H" includeMargin={true} />
                        </div>
                        <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter">Confirmed!</h2>
                        <p className="text-gray-500 text-sm mb-4 font-medium">{activeTicket.eventTitle}</p>
                        
                        <div className="bg-gray-100 p-3 rounded-xl mb-6 border-dashed border-2 border-gray-300">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Ticket ID</p>
                            <p className="text-xs font-mono break-all">{activeTicket.id}</p>
                        </div>

                        <button 
                            onClick={() => setShowTicket(false)}
                            className="w-full bg-darkBase text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                        >
                            Done
                        </button>
                        <p className="mt-4 text-[10px] text-gray-400">Please present this QR at the venue entrance.</p>
                    </div>
                </div>
            )}
        </div>
    );
}