import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API_URL = 'http://localhost:8080';

export default function TaskList() {
     const auth = useAuth();
     const [tasks, setTasks] = useState([]);

     useEffect(() => {
          async function fetchUsersAndTasks() {
               try {
                    const usersRes = await fetch(`${API_URL}/admin/users`, {
                         headers: { Authorization: `Bearer ${auth.token}` },
                    });
                    if (!usersRes.ok) throw new Error('Failed to fetch users');
                    const users = await usersRes.json();

                    const tasksPromises = users.map(async (user) => {
                         const tasksRes = await fetch(`${API_URL}/admin/tasks/${user.id}`, {
                              headers: { Authorization: `Bearer ${auth.token}` },
                         });
                         if (!tasksRes.ok) throw new Error(`Failed to fetch tasks for user ${user.username}`);
                         const userTasks = await tasksRes.json();
                         return userTasks.map(task => ({
                              ...task,
                              assignedToUsername: user.username,
                              assignedToId: user.id,
                         }));
                    });

                    const tasksPerUser = await Promise.all(tasksPromises);
                    const allTasks = tasksPerUser.flat();
                    setTasks(allTasks);
               } catch (err) {
                    alert(err.message);
               }
          }

          fetchUsersAndTasks();
     }, [auth.token]);

     const handleDelete = async (taskId) => {
          if (!window.confirm('Are you sure you want to delete this task?')) return;
          try {
               const res = await fetch(`${API_URL}/admin/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${auth.token}` },
               });
               if (!res.ok) throw new Error('Failed to delete task');
               alert('Task deleted successfully');
               window.location.reload();
          } catch (err) {
               alert(err.message);
          }
     };

     return (
          <div className="bg-white shadow rounded p-4 overflow-x-auto max-h-[700px] w-full">
               <h2 className="text-xl font-semibold mb-4 text-indigo-600">All Tasks</h2>
               {tasks.length === 0 ? (
                    <p>No tasks assigned yet.</p>
               ) : (
                    <div className="overflow-x-auto">
                         <table className="min-w-full table-auto border-collapse border border-gray-300">
                              <thead className="bg-indigo-100 sticky top-0">
                                   <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Title</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Description</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Due Date</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Assigned To</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/4">Status</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center w-1/4">Actions</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {tasks.map((task) => (
                                        <tr key={task.id} className="hover:bg-indigo-50">
                                             <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                                             <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                                             <td className="border border-gray-300 px-4 py-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                                             <td className="border border-gray-300 px-4 py-2">{task.assignedToUsername}</td>
                                             <td className="border border-gray-300 px-4 py-2">{task.status || 'N/A'}</td>
                                             <td className="border border-gray-300 px-4 py-2 text-center">
                                                  <button
                                                       onClick={() => handleDelete(task.id)}
                                                       className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition"
                                                  >
                                                       Delete
                                                  </button>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
          </div>
     );
}
