import React from 'react';
import NavBar from '../components/NavBar';
import TaskAssignForm from '../components/TaskAssignForm';
import TaskList from '../components/TaskList';

export default function AdminDashboard() {
     return (
          <>
               <NavBar />
               <div className="p-3 max-w-8xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-6 text-indigo-700">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                         <TaskAssignForm />
                         <TaskList />
                    </div>
               </div>
          </>
     );
}
