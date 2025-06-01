import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API_URL = 'http://localhost:8080';

export default function TaskAssignForm() {
     const auth = useAuth();
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [dueDate, setDueDate] = useState('');
     const [candidateId, setCandidateId] = useState('');
     const [candidates, setCandidates] = useState([]);

     useEffect(() => {
          async function fetchCandidates() {
               try {
                    const res = await fetch(`${API_URL}/admin/users`, {
                         headers: { Authorization: `Bearer ${auth.token}` },
                    });
                    if (!res.ok) throw new Error('Failed to fetch candidates');
                    const data = await res.json();
                    setCandidates(data);
               } catch (err) {
                    alert(err.message);
               }
          }
          fetchCandidates();
     }, [auth.token]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!title || !description || !dueDate || !candidateId) {
               alert('All fields are required');
               return;
          }
          try {
               const res = await fetch(`${API_URL}/admin/assign/${candidateId}`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({
                         title,
                         description,
                         dueDate,
                         assignedTo: candidateId,
                    }),
               });
               if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Failed to assign task');
               }
               alert('Task assigned successfully');
               setTitle('');
               setDescription('');
               setDueDate('');
               setCandidateId('');
               window.location.reload();
          } catch (err) {
               alert(err.message);
          }
     };

     return (
          <div className="bg-white shadow rounded p-6">
               <h2 className="text-xl font-semibold mb-4 text-indigo-600">Assign Task to Candidate</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                         type="text"
                         placeholder="Task Title"
                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         required
                    />
                    <textarea
                         placeholder="Task Description"
                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         required
                         rows={3}
                    />
                    <input
                         type="date"
                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                         value={dueDate}
                         onChange={(e) => setDueDate(e.target.value)}
                         required
                    />
                    <select
                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                         value={candidateId}
                         onChange={(e) => setCandidateId(e.target.value)}
                         required
                    >
                         <option value="">Select Candidate</option>
                         {candidates.map((cand) => (
                              <option key={cand.id} value={cand.id}>
                                   {cand.username}
                              </option>
                         ))}
                    </select>
                    <button
                         type="submit"
                         className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
                    >
                         Assign Task
                    </button>
               </form>
          </div>
     );
}
