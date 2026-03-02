const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1/platform-admin';

// Helper function to get token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers
const createHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Authentication
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    // Store token
    if (result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.admin));
    }

    return result;
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch profile');
    }

    return result;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to change password');
    }

    return result;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!getToken();
  },
};

// Centers Management
export const centersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/centers${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch centers');
    }

    return result;
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/centers/${id}`, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch center');
    }

    return result;
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/centers`, {
      method: 'POST',
      headers: createHeaders(true),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create center');
    }

    return result;
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/centers/${id}`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update center');
    }

    return result;
  },

  suspend: async (id, suspend) => {
    const response = await fetch(`${API_BASE_URL}/centers/${id}/suspend`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify({ suspend }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update center status');
    }

    return result;
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/centers/${id}`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete center');
    }

    return result;
  },

  getStats: async (id) => {
    const response = await fetch(`${API_BASE_URL}/centers/${id}/stats`, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch center stats');
    }

    return result;
  },
};

// Center Users Management
export const centerUsersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/center-users${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch users');
    }

    return result;
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/center-users/${id}`, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch user');
    }

    return result;
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/center-users/${id}`, {
      method: 'PUT',
      headers: createHeaders(true),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update user');
    }

    return result;
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/center-users/${id}`, {
      method: 'DELETE',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete user');
    }

    return result;
  },

  resetPassword: async (id, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/center-users/${id}/reset-password`, {
      method: 'POST',
      headers: createHeaders(true),
      body: JSON.stringify({ newPassword }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to reset password');
    }

    return result;
  },
};

// Analytics
export const analyticsAPI = {
  getSystemStats: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/stats`, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch system stats');
    }

    return result;
  },
};

// Regular Users (Pet Owners, Vets, Store Owners)
export const regularUsersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/users${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch users');
    }

    return result;
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: createHeaders(true),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch user');
    }

    return result;
  },
};
