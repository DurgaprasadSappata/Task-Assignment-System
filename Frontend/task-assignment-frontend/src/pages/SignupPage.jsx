import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SignupPage() {
     const auth = useAuth();
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');
     const [role, setRole] = useState('CANDIDATE');

     const handleSubmit = async (e) => {
          e.preventDefault();
          await auth.signup(username, password, role, email);
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
               <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Task Assignment System - Sign Up</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <input
                              type="text"
                              placeholder="Username"
                              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                              autoFocus
                         />
                         <input
                              type="email"
                              placeholder="Email"
                              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                         />
                         <select
                              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              required
                         >
                              <option value="CANDIDATE">Candidate</option>
                              <option value="ADMIN">Admin</option>
                         </select>
                         <button
                              type="submit"
                              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
                         >
                              Sign Up
                         </button>
                    </form>
                    <p className="mt-4 text-center">
                         Already have an account?{' '}
                         <Link to="/login" className="text-green-700 underline hover:text-green-900">
                              Login
                         </Link>
                    </p>
               </div>
          </div>
     );
}
