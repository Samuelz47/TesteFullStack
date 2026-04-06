import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://localhost:7156/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use((response) => {
    // Unwrap the backend Result object if present
    if (response.data && typeof response.data === 'object' && 'isSuccess' in response.data) {
        response.data = response.data.data;
    }
    return response;
});

