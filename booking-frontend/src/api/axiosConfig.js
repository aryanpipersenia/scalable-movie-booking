import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Points exactly to your API Gateway
});

// Automatically attach the JWT token if the user is logged in
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