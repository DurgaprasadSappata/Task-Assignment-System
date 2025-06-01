import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import { AuthProvider, useAuth, RequireAuth } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import CandidateDashboard from './pages/CandidateDashboard';

function Home() {
  const auth = useAuth();
  if (auth.user) {
    if (auth.user.roles.includes('ADMIN')) {
      return <Navigate to="/admin" replace />;
    }
    if (auth.user.roles.includes('CANDIDATE')) {
      return <Navigate to="/candidate" replace />;
    }
  }
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/admin/*"
            element={
              <RequireAuth role="ADMIN">
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/candidate/*"
            element={
              <RequireAuth role="CANDIDATE">
                <CandidateDashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
