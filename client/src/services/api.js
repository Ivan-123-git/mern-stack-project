import axios from 'axios';

// Base API Configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api/students',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dynamic getter for the Auth Token (set by the React app on mount/auth change)
let getAuthToken = null;

export const setGetToken = (fn) => {
  getAuthToken = fn;
};

// Request Interceptor to inject Clerk Session JWT
API.interceptors.request.use(
  async (config) => {
    if (getAuthToken) {
      try {
        const token = await getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Error retrieving Clerk token in API interceptor:', err);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all students
export const getStudents = async () => {
  try {
    const response = await API.get('/');
    return response.data;
  } catch (error) {
    console.error('Error in getStudents API:', error);
    throw error.response?.data?.error || error.message || 'Failed to fetch students';
  }
};

// Fetch a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getStudentById (${id}) API:`, error);
    throw error.response?.data?.error || error.message || 'Failed to fetch student details';
  }
};

// Create a new student record
export const createStudent = async (studentData) => {
  try {
    const response = await API.post('/', studentData);
    return response.data;
  } catch (error) {
    console.error('Error in createStudent API:', error);
    throw error.response?.data?.error || error.message || 'Failed to create student';
  }
};

// Update an existing student record
export const updateStudent = async (id, studentData) => {
  try {
    const response = await API.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error(`Error in updateStudent (${id}) API:`, error);
    throw error.response?.data?.error || error.message || 'Failed to update student';
  }
};

// Delete a student record
export const deleteStudent = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in deleteStudent (${id}) API:`, error);
    throw error.response?.data?.error || error.message || 'Failed to delete student';
  }
};

export default API;
