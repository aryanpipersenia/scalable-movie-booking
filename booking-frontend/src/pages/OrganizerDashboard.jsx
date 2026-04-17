import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

export default function OrganizerDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        category: 'Movie',
        eventDate: '',
        duration: 120,
        ticketPrice: 0,
        totalCapacity: 100,
        hasAssignedSeating: false,
        imageUrl: '' 
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Define your platform's flat listing fee
        const platformFee = 500; 

        const options = {
            key: "rzp_test_SbjyvmGQIgUO7f", // Your existing Razorpay Test Key
            amount: platformFee * 100, // Razorpay uses paise (multiply by 100)
            currency: "INR",
            name: "TicketMaster Pro Platform",
            description: `Listing Fee for: ${eventData.title}`,
            theme: { color: "#1A1A2E" }, // A dark theme to match the organizer portal
            handler: async function (response) {
                try {
                    // PAYMENT SUCCESSFUL! Now we push the event to the backend.
                    const payload = {
                        ...eventData,
                        organizerId: "CURRENT_USER",
                        status: "LIVE" 
                    };

                    await apiClient.post('/api/events/add', payload);
                    
                    alert(`Payment of ₹${platformFee} Successful!\nReceipt ID: ${response.razorpay_payment_id}\n\nYour event is now LIVE.`);
                    navigate('/movies'); 
                } catch (error) {
                    console.error("Failed to create event:", error);
                    alert("Payment succeeded, but we couldn't list the event. Please contact support.");
                } finally {
                    setLoading(false);
                }
            }
        };

        const rzp = new window.Razorpay(options);
        
        // If the user closes the modal or payment fails, stop the loading spinner
        rzp.on('payment.failed', function (response){
            alert(`Payment Failed: ${response.error.description}`);
            setLoading(false);
        });

        // Open the payment modal
        rzp.open();
    };

    return (
        <div className="min-h-screen bg-darkBase text-white p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-brand">Organizer Portal</h1>
                        <p className="text-gray-400 mt-2">Pay the ₹500 platform fee to list a new event.</p>
                    </div>
                    <button onClick={() => navigate('/movies')} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                        ← Back to Events
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-darkCard p-8 rounded-2xl shadow-xl space-y-6 border border-gray-800">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
                            <input type="text" name="title" required value={eventData.title} onChange={handleChange} className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none" placeholder="e.g. Comedy Night" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                            <select name="category" value={eventData.category} onChange={handleChange} className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none">
                                <option value="Movie">Movie</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Tech">Tech Fest</option>
                                <option value="Music">Music Concert</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea name="description" required value={eventData.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none" placeholder="What is this event about?"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Image URL (Optional)</label>
                        <input type="url" name="imageUrl" value={eventData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none" placeholder="https://picsum.photos/seed/any/800/400" />
                    </div>

                    {/* Logistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                            <input type="date" name="eventDate" required value={eventData.eventDate} onChange={handleChange} className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Ticket Price (₹)</label>
                            <input type="number" name="ticketPrice" required min="0" value={eventData.ticketPrice} onChange={handleChange} className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Total Capacity</label>
                            <input type="number" name="totalCapacity" required min="1" value={eventData.totalCapacity} onChange={handleChange} className="w-full px-4 py-3 bg-darkBase border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-brand focus:outline-none" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-brand hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(233,69,96,0.3)] mt-6 text-lg disabled:opacity-50">
                        {loading ? 'Awaiting Payment...' : 'Pay ₹500 & Launch Event'}
                    </button>
                </form>
            </div>
        </div>
    );
}