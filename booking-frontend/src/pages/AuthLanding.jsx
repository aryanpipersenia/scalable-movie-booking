import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

export default function AuthLanding() {
    const [view, setView] = useState('login'); // Toggles between 'login' and 'signup'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const safeUsername = username.trim();
            // Call the API Gateway -> Identity Service
            const response = await apiClient.post(`/auth/login?username=${safeUsername}&password=${password}`);
            
            // Save the JWT Token
            localStorage.setItem('jwt_token', response.data);
            
            // Send them to the dashboard
            navigate('/movies');
        } catch (error) {
            alert('Login failed. Please check your username and password.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username: username.trim(),
                password: password,
                role: 'USER'
            };
            await apiClient.post('/auth/register', newUser);
            alert('Account created! You can now log in.');
            setView('login'); // Switch back to login view automatically
            setPassword(''); // Clear the password field
        } catch (error) {
            alert('Registration failed. That username might already be taken!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkBase text-white p-4">
            <div className="bg-darkCard w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-brand p-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">TicketMaster Pro</h1>
                    <p className="text-white/80 mt-2 text-sm">Your gateway to the best events.</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {view === 'login' ? 'Welcome Back' : 'Create an Account'}
                    </h2>

                    <form onSubmit={view === 'login' ? handleLogin : handleSignup} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-darkBase border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 transition-all"
                                placeholder="e.g. aryan_admin"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-darkBase border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-brand hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg mt-4"
                        >
                            {view === 'login' ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Toggle View */}
                    <div className="mt-8 text-center text-sm text-gray-400">
                        {view === 'login' ? (
                            <p>Don't have an account? <button onClick={() => setView('signup')} className="text-brand hover:text-white font-semibold transition-colors">Register here</button></p>
                        ) : (
                            <p>Already have an account? <button onClick={() => setView('login')} className="text-brand hover:text-white font-semibold transition-colors">Sign in here</button></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}