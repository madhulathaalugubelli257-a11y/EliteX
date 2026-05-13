// AuthContext.jsx
// Provides authentication state throughout the app using Context API
import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/usersData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize user from localStorage on first render
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('elitex_token');
    const storedUser = localStorage.getItem('elitex_user');
    if (token && storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Derived: check if authenticated
  const isAuthenticated = !!user;

  // Mock login — checks against usersData
  const login = (email, password) => {
    setLoading(true);
    setAuthError('');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          const { password: _, ...safeUser } = found; // strip password
          const token = `mock_jwt_${Date.now()}_${safeUser.id}`;
          localStorage.setItem('elitex_token', token);
          localStorage.setItem('elitex_user', JSON.stringify(safeUser));
          setUser(safeUser);
          setLoading(false);
          resolve(safeUser);
        } else {
          setAuthError('Invalid email or password.');
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 800); // simulate network delay
    });
  };

  // Mock register — adds user to session (not persisted between reloads)
  const register = (name, email, password, college) => {
    setLoading(true);
    setAuthError('');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = mockUsers.find((u) => u.email === email);
        if (exists) {
          setAuthError('Email already registered. Please login.');
          setLoading(false);
          reject(new Error('Email exists'));
          return;
        }
        const newUser = {
          id: Date.now(),
          name,
          email,
          college,
          avatar: '👤',
          joinedDate: new Date().toISOString(),
        };
        const token = `mock_jwt_${Date.now()}_${newUser.id}`;
        localStorage.setItem('elitex_token', token);
        localStorage.setItem('elitex_user', JSON.stringify(newUser));
        setUser(newUser);
        setLoading(false);
        resolve(newUser);
      }, 800);
    });
  };

  // Logout — clears localStorage
  const logout = () => {
    localStorage.removeItem('elitex_token');
    localStorage.removeItem('elitex_user');
    setUser(null);
  };

  // Update profile
  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('elitex_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, authError, login, register, logout, updateProfile, setAuthError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
