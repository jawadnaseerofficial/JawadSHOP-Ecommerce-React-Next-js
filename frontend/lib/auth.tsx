import api from './axios';

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  
  // Store access token for subsequent requests
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', data.accessToken);
  }
  
  return data.user;
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (e) {
    console.error('Logout error', e);
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }
};