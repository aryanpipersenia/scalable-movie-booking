import axios from 'axios';

// Point this to your Spring Cloud Gateway!
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', 
});

// Automatically attach the JWT token to every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;