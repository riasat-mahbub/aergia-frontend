const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Auth endpoints
  auth = {
    register: (data: { email: string; password: string; fullName: string }) =>
      this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    login: (data: { email: string; password: string; rememberMe?: boolean }) =>
      this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    logout: () =>
      this.request('/auth/logout', {
        method: 'POST',
      }),
    
      isLoggedIn: () =>
        this.request('/auth/isLoggedIn')
  };

  // CV endpoints
  cvs = {
    getAll: () => this.request('/cv'),
    
    create: () => this.request('/cv', { method: 'POST' }),
    
    get: (id: string) => this.request(`/cv/${id}`),
    
    delete: (id: string) => this.request(`/cv/${id}`, { method: 'DELETE' }),
  };

  // FormGroup endpoints
  formGroups = {
    getAll: (cvId: string) => this.request(`/formGroup/${cvId}`),
    
    create: (cvId: string, data: { title: string; type: string; data: any }) =>
      this.request(`/formGroup/${cvId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    get: (cvId: string, id: string) => this.request(`/formGroup/${cvId}/${id}`),
    
    update: (cvId: string, id: string, data: { title: string; type: string; data: any }) =>
      this.request(`/formGroup/${cvId}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    
    delete: (cvId: string, id: string) =>
      this.request(`/formGroup/${cvId}/${id}`, { method: 'DELETE' }),
  };

  // User endpoints
  users = {
    getUser: () => this.request('/getUser'),
  };
}

export const apiService = new ApiService();