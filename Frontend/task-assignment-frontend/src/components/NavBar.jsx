import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function NavBar() {
     const auth = useAuth();

     return (
          <nav className="bg-indigo-600 p-4 flex justify-between items-center text-white">
               <div className="font-bold text-lg cursor-default">Task Assignment System</div>
               <div>
                    <span className="mr-6">Hello, {auth.user?.username}</span>
                    <button
                         onClick={auth.logout}
                         className="bg-indigo-800 hover:bg-indigo-900 py-1 px-3 rounded transition"
                         aria-label="Logout"
                    >
                         Logout
                    </button>
               </div>
          </nav>
     );
}
