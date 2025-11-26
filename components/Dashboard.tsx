import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { MOCK_REQUESTS, MOCK_BUDGET } from '../constants';
import { Status, Department } from '../types';

const Dashboard: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const departments = Object.values(Department).sort();

  // Filter requests based on selected department
  const filteredRequests = MOCK_REQUESTS.filter(r => 
    selectedDept === 'All' || r.department === selectedDept
  );

  const pendingRequests = filteredRequests.filter(r => r.status === Status.PENDING_APPROVAL || r.status === Status.IN_REVIEW).length;
  const approvedRequests = filteredRequests.filter(r => r.status === Status.APPROVED).length;
  const completedRequests = filteredRequests.filter(r => r.status === Status.COMPLETED).length;
  const rejectedRequests = filteredRequests.filter(r => r.status === Status.REJECTED).length;

  const totalBudget = MOCK_BUDGET.reduce((acc, curr) => acc + curr.allocated, 0);
  const utilizedBudget = MOCK_BUDGET.reduce((acc, curr) => acc + curr.utilized, 0);
  
  const utilizationPercentage = Math.round((utilizedBudget / totalBudget) * 100);

  const budgetData = MOCK_BUDGET.map(b => ({
    name: b.code,
    Allocated: b.allocated,
    Utilized: b.utilized
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const requestStatusData = [
    { name: 'Pending', value: pendingRequests },
    { name: 'Approved', value: approvedRequests },
    { name: 'Completed', value: completedRequests > 0 ? completedRequests : 1 }, // Mock 1 if 0 for visibility
    { name: 'Rejected', value: rejectedRequests > 0 ? rejectedRequests : 1 }, // Mock 1 if 0 for visibility
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Header with Filter */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Reporting & Analytics</h2>
           <p className="text-sm text-gray-500">Executive overview of ministry performance.</p>
        </div>
        
        <div className="flex items-center bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
           <span className="text-sm font-medium text-gray-600 mr-3 pl-2">Filter View:</span>
           <select 
             value={selectedDept}
             onChange={(e) => setSelectedDept(e.target.value)}
             className="border-none bg-gray-50 rounded-md text-sm py-1.5 px-3 focus:ring-2 focus:ring-fme-500 cursor-pointer text-gray-700 font-medium outline-none"
           >
             <option value="All">All Departments</option>
             {departments.map(d => (
               <option key={d} value={d}>{d}</option>
             ))}
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{pendingRequests}</h3>
            </div>
            <span className="p-2 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-semibold">Action Needed</span>
          </div>
          <p className="text-xs text-gray-400 mt-4">For {selectedDept === 'All' ? 'all departments' : 'selected dept'}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Budget Utilization</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{utilizationPercentage}%</h3>
            </div>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">FY 2024</span>
          </div>
          <p className="text-xs text-gray-400 mt-4">Ministry-wide Metric</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Tenders</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">4</h3>
            </div>
            <span className="p-2 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">Procurement</span>
          </div>
          <p className="text-xs text-gray-400 mt-4">1 closing this week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Vehicles in Service</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">14</h3>
            </div>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold">Fleet</span>
          </div>
          <p className="text-xs text-gray-400 mt-4">2 due for maintenance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Performance (Allocated vs Utilized)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="Allocated" fill="#e0f2fe" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Utilized" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Requests Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {requestStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {requestStatusData.map((entry, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600">
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* SLA Compliance / Alerts */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
        <h4 className="font-semibold text-red-800 text-sm mb-2">Critical Alerts</h4>
        <ul className="space-y-2 text-sm text-red-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Payment Voucher #REQ-992 is pending 'Director Finance' approval for 5 days (SLA Breach).
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Stock Alert: A4 Paper supply is critical (Below 50 Reams).
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;