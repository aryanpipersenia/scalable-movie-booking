import { useState } from 'react';
import apiClient from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call the Identity Service through the Gateway
            const response = await apiClient.post(`/auth/login?username=${username}&role=USER`);
            
            // Save the token to the browser's local storage
            localStorage.setItem('jwt_token', response.data);
            alert('Login Successful!');
            navigate('/movies'); // Send them to the catalog
        } catch (error) {
            alert('Login failed. Check backend connection.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login to Movie Booking</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}