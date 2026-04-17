import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import apiClient from '../api/axiosConfig';

export default function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyTickets = async () => {
            try {
                // We used "1" as the hardcoded userId during the booking phase earlier!
                const response = await apiClient.get('/api/bookings/user/1');
                setTickets(response.data);
            } catch (error) {
                console.error("Failed to fetch tickets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyTickets();
    }, []);

    return (
        <div className="min-h-screen bg-darkBase text-white p-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-brand">My Tickets</h1>
                        <p className="text-gray-400 mt-2">Present these QR codes at the venue.</p>
                    </div>
                    <button onClick={() => navigate('/movies')} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                        ← Back to Events
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-xl animate-pulse text-gray-500 mt-20">Loading your wallet...</div>
                ) : tickets.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20 bg-darkCard p-10 rounded-2xl border border-gray-800">
                        <p className="text-2xl font-semibold mb-2">Your wallet is empty.</p>
                        <p>Go book some shows!</p>
                        <button onClick={() => navigate('/movies')} className="mt-6 bg-brand px-6 py-2 rounded-lg font-bold text-white hover:bg-red-600">Browse Events</button>
                    </div>
                ) : (
                    /* The Ticket Wallet Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="bg-white text-darkBase rounded-2xl shadow-xl overflow-hidden flex flex-col items-center p-6 border-4 border-gray-200 relative">
                                
                                {/* A little decorative punch-hole for the "ticket" look */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-darkBase rounded-full"></div>
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-darkBase rounded-full"></div>

                                <h2 className="text-xl font-black uppercase tracking-widest text-brand mb-4 text-center">Admit One</h2>
                                
                                <div className="bg-white p-2 rounded-xl shadow-inner border border-gray-100">
                                    <QRCodeSVG value={ticket.id} size={150} level="H" />
                                </div>
                                
                                <div className="w-full mt-6 border-t-2 border-dashed border-gray-300 pt-4 text-center">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Secure UUID</p>
                                    <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 break-all">{ticket.id}</p>
                                </div>
                                <div className="mt-4 w-full flex justify-between items-center px-2">
                                    <span className="text-sm font-bold text-gray-400">Paid</span>
                                    <span className="text-lg font-black text-green-600">₹{ticket.amountPaid}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}