import axios from 'axios';

const API_URL = 'http://localhost:5000/service';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/user/signin', { email, password });
    if (response.data.requireOtp) {
      return { requireOtp: true, userId: response.data.userId };
    }
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  
  signup: async (userData) => {
    const response = await api.post('/user/signup', userData);
    return response.data;
  },
  
  verifyOtp: async (email, token) => {
    const response = await api.post('/user/verify-otp', { email, token });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/user/user-infor');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  }
};

// Todo services
export const todoService = {
  getAllTodos: async () => {
    const response = await api.get('/todo/get_all');
    return response.data;
  },
  
  createTodo: async (todoData) => {
    const response = await api.post('/todo/add_todo', todoData);
    return response.data;
  },
  
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todo/update_todo/${id}`, todoData);
    return response.data;
  },
  
  deleteTodo: async (id) => {
    const response = await api.delete(`/todo/delete_todo/${id}`);
    return response.data;
  }
};

export default api;