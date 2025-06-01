import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
     const auth = useAuth();
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          await auth.login(username, password);
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500">
               <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Task Assignment System - Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <input
                              type="text"
                              placeholder="Email or Username"
                              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                              autoFocus
                         />
                         <div className="relative">
                              <input
                                   type={showPassword ? "text" : "password"}
                                   placeholder="Password"
                                   className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                              />
                              <button
                                   type="button"
                                   onClick={() => setShowPassword(!showPassword)}
                                   className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                              >
                                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </button>
                         </div>
                         <button
                              type="submit"
                              className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
                         >
                              Login
                         </button>
                    </form>
                    <p className="mt-4 text-center">
                         Don't have an account?{' '}
                         <Link to="/signup" className="text-indigo-700 underline hover:text-indigo-900">
                              Sign Up
                         </Link>
                    </p>
               </div>
          </div>
     );
}
