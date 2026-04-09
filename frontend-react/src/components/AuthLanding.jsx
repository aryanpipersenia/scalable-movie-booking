import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

export default function AuthLanding() {
    // State to toggle between 'login', 'signup', and 'forgot'
    const [view, setView] = useState('login'); 
    
    // Form states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Using your existing Identity Service endpoint
            const response = await apiClient.post(`/auth/login?username=${username}&role=USER`);
            localStorage.setItem('jwt_token', response.data);
            navigate('/movies');
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        await apiClient.post('/auth/register', newUser);
        alert(`Account created for ${username}! Please log in.`);
        setView('login');
    } catch (error) {
        alert('Registration failed. Username might already exist.');
    }
};

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Map to a password reset flow in the future
        alert(`Password reset link sent to ${email}`);
        setView('login');
    };

    // --- RENDER HELPERS ---
    
    const renderLogin = () => (
        <form onSubmit={handleLogin} style={styles.form}>
            <h2>Welcome Back</h2>
            <p style={styles.subtitle}>Log in to book your favorite movies.</p>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
            
            <div style={styles.linkContainer}>
                <span style={styles.link} onClick={() => setView('forgot')}>Forgot Password?</span>
            </div>
            
            <button type="submit" style={styles.primaryButton}>Sign In</button>
            
            <p style={styles.switchText}>
                New here? <span style={styles.link} onClick={() => setView('signup')}>Create an account</span>
            </p>
        </form>
    );

    const renderSignup = () => (
        <form onSubmit={handleSignup} style={styles.form}>
            <h2>Create an Account</h2>
            <p style={styles.subtitle}>Join us to start booking tickets.</p>
            <input type="text" placeholder="Choose a Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
            
            <button type="submit" style={styles.primaryButton}>Sign Up</button>
            
            <p style={styles.switchText}>
                Already have an account? <span style={styles.link} onClick={() => setView('login')}>Log in</span>
            </p>
        </form>
    );

    const renderForgot = () => (
        <form onSubmit={handleForgotPassword} style={styles.form}>
            <h2>Reset Password</h2>
            <p style={styles.subtitle}>Enter your email and we'll send you a recovery link.</p>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            
            <button type="submit" style={styles.primaryButton}>Send Reset Link</button>
            
            <p style={styles.switchText}>
                Remembered it? <span style={styles.link} onClick={() => setView('login')}>Back to login</span>
            </p>
        </form>
    );

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Dynamically render the correct form based on state */}
                {view === 'login' && renderLogin()}
                {view === 'signup' && renderSignup()}
                {view === 'forgot' && renderForgot()}
            </div>
        </div>
    );
}

// --- BASIC INLINE STYLES ---
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f4f7f6' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    subtitle: { color: '#666', marginBottom: '20px', fontSize: '14px' },
    input: { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' },
    primaryButton: { padding: '12px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
    linkContainer: { textAlign: 'right' },
    link: { color: '#007BFF', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' },
    switchText: { marginTop: '20px', fontSize: '14px', color: '#555' }
};