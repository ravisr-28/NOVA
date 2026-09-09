import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nova_token'));
  const [loading, setLoading] = useState(true);

  // On mount — check if we have a stored token and load user
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('nova_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        setUser(res.data.data);
        setToken(storedToken);
      } catch (err) {
        // Token is invalid or expired
        localStorage.removeItem('nova_token');
        localStorage.removeItem('nova_user');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register
  const register = useCallback(async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { data, token: newToken } = res.data;

    localStorage.setItem('nova_token', newToken);
    localStorage.setItem('nova_user', JSON.stringify(data));
    setUser(data);
    setToken(newToken);

    return data;
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { data, token: newToken } = res.data;

    localStorage.setItem('nova_token', newToken);
    localStorage.setItem('nova_user', JSON.stringify(data));
    setUser(data);
    setToken(newToken);

    return data;
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('nova_token');
    localStorage.removeItem('nova_user');
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
