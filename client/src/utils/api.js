const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('physichem_admin_token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData (file uploads)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// ===== Auth =====
export const loginAdmin = (credentials) =>
  apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const getCurrentAdmin = () =>
  apiRequest('/api/auth/me');

// ===== Teachers =====
export const getTeachers = () =>
  apiRequest('/api/teachers');

export const getTeacher = (id) =>
  apiRequest(`/api/teachers/${id}`);

export const createTeacher = (formData) =>
  apiRequest('/api/teachers', { method: 'POST', body: formData });

export const updateTeacher = (id, formData) =>
  apiRequest(`/api/teachers/${id}`, { method: 'PUT', body: formData });

export const deleteTeacher = (id) =>
  apiRequest(`/api/teachers/${id}`, { method: 'DELETE' });

// ===== Courses =====
export const getCourses = () =>
  apiRequest('/api/courses');

export const getCourse = (id) =>
  apiRequest(`/api/courses/${id}`);

export const createCourse = (data) =>
  apiRequest('/api/courses', { method: 'POST', body: JSON.stringify(data) });

export const updateCourse = (id, data) =>
  apiRequest(`/api/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteCourse = (id) =>
  apiRequest(`/api/courses/${id}`, { method: 'DELETE' });

// ===== Enquiries =====
export const submitEnquiry = (data) =>
  apiRequest('/api/enquiries', { method: 'POST', body: JSON.stringify(data) });

export const getEnquiries = (params = '') =>
  apiRequest(`/api/enquiries${params ? `?${params}` : ''}`);

export const updateEnquiryStatus = (id, status) =>
  apiRequest(`/api/enquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });

export const deleteEnquiry = (id) =>
  apiRequest(`/api/enquiries/${id}`, { method: 'DELETE' });

export const getEnquiryStats = () =>
  apiRequest('/api/enquiries/stats');
