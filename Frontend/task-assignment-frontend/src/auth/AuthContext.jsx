import React, { createContext, useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080';

const AuthContext = createContext();

export function useAuth() {
     return useContext(AuthContext);
}

export function AuthProvider({ children }) {
     const navigate = useNavigate();
     const [token, setToken] = useState(() => localStorage.getItem('token'));
     const [user, setUser] = useState(() => {
          if (!token) return null;
          try {
               const payload = JSON.parse(atob(token.split('.')[1]));
               return { username: payload.sub, roles: payload.role?.map(r => r.authority || r) || [] };
          } catch {
               return null;
          }
     });

     const login = async (username, password) => {
          try {
               const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
               });
               if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText || 'Invalid credentials');
               }
               // Try to parse JSON response safely
               let data;
               const contentType = res.headers.get('content-type') || '';
               if (contentType.includes('application/json')) {
                    data = await res.json();
                    if (!data.token) throw new Error('No token in response');
               } else {
                    const text = await res.text();
                    data = { token: text.trim() };
               }
               localStorage.setItem('token', data.token);
               setToken(data.token);
               const payload = JSON.parse(atob(data.token.split('.')[1]));

               setUser({ username: payload.sub, roles: payload.role?.map(r => r.authority || r) || [] });
               if (payload.role?.some(r => (r.authority || r) === 'ROLE_ADMIN' || (r.authority || r) === 'ADMIN')) {
                    navigate('/admin');
               } else {
                    navigate('/candidate');
               }
               alert(`Welcome ${username}`)
               return true;
          } catch (err) {
               alert(`Login failed: ${err.message}`);
               return false;
          }
     };

     const signup = async (username, password, role, email) => {
          try {
               const res = await fetch(`${API_URL}/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, role, email }),
               });
               if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Signup failed');
               }
               alert('Signup successful! Please login.');
               navigate('/login');
               return true;
          } catch (err) {
               alert(err.message);
               return false;
          }
     };

     const logout = () => {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          navigate('/login');
     };

     const value = {
          token,
          user,
          login,
          signup,
          logout,
     };

     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children, role }) {
     const auth = useAuth();
     if (!auth.user) return <Navigate to="/login" replace />;
     if (role && !auth.user.roles.includes(`ROLE_${role}`)) return <Navigate to="/" replace />;
     return children;
}

