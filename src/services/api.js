// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://altrion-server.vercel.app';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Log detailed error information
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error: No response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// ============ COURSES API ============
export const coursesAPI = {
  // Get all courses with optional filters
  getAllCourses: async (params = {}) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  // Get single course by ID
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Get courses by instructor email
  getCoursesByInstructor: async (email) => {
    const response = await api.get(`/courses/instructor/${email}`);
    return response.data;
  },

  // Create new course
  createCourse: async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  // Update course
  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  // Delete course
  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Get featured courses
  getFeaturedCourses: async () => {
    try {
      // Try featured endpoint first
      const response = await api.get('/courses/featured');
      return response.data;
    } catch (error) {
      // Fallback: get all courses and filter
      const allCourses = await api.get('/courses');
      const coursesArray = Array.isArray(allCourses.data) ? allCourses.data : [];
      return coursesArray.filter(course => course.isFeatured);
    }
  },
};

// ============ CATEGORIES API ============
export const categoriesAPI = {
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// ============ ENROLLMENTS API ============
export const enrollmentsAPI = {
  // Get enrollments by user email
  getEnrollmentsByUser: async (email) => {
    const response = await api.get(`/enrollments/${email}`);
    return response.data;
  },

  // Create enrollment
  createEnrollment: async (enrollmentData) => {
    const response = await api.post('/enrollments', enrollmentData);
    return response.data;
  },

  // Check if user is enrolled
  checkEnrollment: async (courseId, userEmail) => {
    const response = await api.get(`/enrollments/check/${courseId}/${userEmail}`);
    return response.data;
  },
};

export default api;