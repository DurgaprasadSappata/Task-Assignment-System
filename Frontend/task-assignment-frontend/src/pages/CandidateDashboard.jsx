import React from 'react';
import Navbar from '../components/Navbar';
import CandidateTaskList from '../components/CandidateTaskList';

export default function CandidateDashboard() {
     return (
          <>
               <Navbar />
               <div className="p-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-6 text-green-700">Candidate Dashboard</h1>
                    <CandidateTaskList />
               </div>
          </>
     );
}
