import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
        baseURL: API_URL,
        headers: {
                'Content-Type': 'application/json',
        },
});

// Newsletter API
export const newsletterAPI = {
        subscribe: async (email, source = 'footer') => {
                const response = await api.post('/newsletter/subscribe', { email, source });
                return response.data;
        },

        unsubscribe: async (email) => {
                const response = await api.post('/newsletter/unsubscribe', { email });
                return response.data;
        },

        getSubscribers: async (page = 1, limit = 50, active = true) => {
                const response = await api.get('/newsletter/subscribers', {
                        params: { page, limit, active }
                });
                return response.data;
        }
};

// Contact API
export const contactAPI = {
        submit: async (formData) => {
                const response = await api.post('/contact/submit', formData);
                return response.data;
        },

        getMessages: async (page = 1, limit = 20, status = 'all') => {
                const response = await api.get('/contact/messages', {
                        params: { page, limit, status }
                });
                return response.data;
        },

        updateStatus: async (id, status) => {
                const response = await api.patch(`/contact/messages/${id}/status`, { status });
                return response.data;
        }
};

// Health check
export const healthCheck = async () => {
        const response = await api.get('/health');
        return response.data;
};

export default api;
