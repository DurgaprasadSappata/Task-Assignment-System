import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API_URL = 'http://localhost:8080';

export default function CandidateTaskList() {
     const auth = useAuth();
     const [tasks, setTasks] = useState([]);
     const [editingTaskId, setEditingTaskId] = useState(null);
     const [newStatus, setNewStatus] = useState('');

     const fetchTasks = async () => {
          try {
               const res = await fetch(`${API_URL}/candidate/tasks`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${auth.token}` },
                    mode: 'cors'
               });
               if (!res.ok) throw new Error('Failed to fetch tasks');
               const data = await res.json();
               setTasks(data);
          } catch (err) {
               alert(err.message);
          }
     };

     useEffect(() => {
          fetchTasks();
     }, []);

     const handleEditClick = (task) => {
          setEditingTaskId(task.id);
          setNewStatus(task.status || '');
     };

     const handleCancel = () => {
          setEditingTaskId(null);
          setNewStatus('');
     };

     const handleSave = async (taskId) => {
          if (!newStatus) {
               alert('Please select a status');
               return;
          }
          try {
               const res = await fetch(`${API_URL}/candidate/tasks/${taskId}/status?status=${encodeURIComponent(newStatus)}`, {
                    method: 'PUT',
                    headers: {
                         Authorization: `Bearer ${auth.token}`,
                    },
               });
               if (!res.ok) throw new Error('Failed to update task status');
               alert('Task status updated');
               setEditingTaskId(null);
               setNewStatus('');
               fetchTasks();
          } catch (err) {
               alert(err.message);
          }
     };

     return (
          <div className="bg-white shadow rounded p-6 max-h-[600px] overflow-x-auto">
               <h2 className="text-xl font-semibold mb-4 text-green-600">My Tasks</h2>
               {tasks.length === 0 ? (
                    <p>No tasks assigned to you yet.</p>
               ) : (
                    <table className="w-full table-auto border-collapse border border-gray-300">
                         <thead>
                              <tr className="bg-green-100">
                                   <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left">Due Date</th>
                                   <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                   <th className="border border-gray-300 px-4 py-2">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {tasks.map((task) => (
                                   <tr key={task.id} className="hover:bg-green-50">
                                        <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                                        <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                             {editingTaskId === task.id ? (
                                                  <select
                                                       className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                                       value={newStatus}
                                                       onChange={(e) => setNewStatus(e.target.value)}
                                                  >
                                                       <option value="">Select status</option>
                                                       <option value="PENDING">Pending</option>
                                                       <option value="IN_PROGRESS">In Progress</option>
                                                       <option value="COMPLETED">Completed</option>
                                                  </select>
                                             ) : (
                                                  task.status || 'N/A'
                                             )}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                             {editingTaskId === task.id ? (
                                                  <>
                                                       <button
                                                            onClick={() => handleSave(task.id)}
                                                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded mr-2 transition"
                                                       >
                                                            Save
                                                       </button>
                                                       <button
                                                            onClick={handleCancel}
                                                            className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded transition"
                                                       >
                                                            Cancel
                                                       </button>
                                                  </>
                                             ) : (
                                                  <button
                                                       onClick={() => handleEditClick(task)}
                                                       className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded transition"
                                                  >
                                                       Update Status
                                                  </button>
                                             )}
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               )}
          </div>
     );
}
