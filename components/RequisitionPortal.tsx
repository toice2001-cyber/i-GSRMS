import React, { useState } from 'react';
import { MOCK_REQUESTS } from '../constants';
import { Department, Status, RequestItem } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  User, 
  Calendar, 
  CreditCard, 
  Building2,
  AlertCircle
} from 'lucide-react';

interface Props {
  onNewRequest: () => void;
}

const RequisitionPortal: React.FC<Props> = ({ onNewRequest }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  // Filter requests based on Department and Search Term
  const filteredRequests = MOCK_REQUESTS.filter(req => {
    const matchesDept = selectedDept === 'All' || req.department === selectedDept;
    const matchesSearch = 
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.initiator.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const departments = Object.values(Department).sort();

  // Helper to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case Status.APPROVED: return 'bg-green-100 text-green-800 border-green-200';
      case Status.REJECTED: return 'bg-red-100 text-red-800 border-red-200';
      case Status.COMPLETED: return 'bg-blue-100 text-blue-800 border-blue-200';
      case Status.IN_REVIEW: return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (selectedRequest) {
    // Check if request is cancellable (Draft or Pending Approval)
    // Note: In a production environment, also verify the current user is the initiator.
    const isCancellable = selectedRequest.status === Status.DRAFT || selectedRequest.status === Status.PENDING_APPROVAL;

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedRequest(null)}
              className="p-2 hover:bg-white bg-gray-100 rounded-full text-gray-600 transition-colors shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                Request Details
                <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  {selectedRequest.referenceNo}
                </span>
              </h2>
            </div>
          </div>

          {isCancellable && (
            <button 
              className="flex items-center px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors shadow-sm"
              onClick={() => alert(`Request ${selectedRequest.referenceNo} has been cancelled.`)}
            >
              <XCircle size={18} className="mr-2" />
              Cancel Request
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{selectedRequest.type}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" /> Submitted on {selectedRequest.dateSubmitted}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-500 mb-1">
                      <CreditCard size={16} className="mr-2" />
                      <span className="text-xs font-medium uppercase">Estimated Amount</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {selectedRequest.amount ? `₦${selectedRequest.amount.toLocaleString()}` : 'N/A'}
                    </div>
                  </div>
                   <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Building2 size={16} className="mr-2" />
                      <span className="text-xs font-medium uppercase">Department</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 truncate" title={selectedRequest.department}>
                      {selectedRequest.department}
                    </div>
                  </div>
               </div>

               <div className="space-y-2">
                 <h4 className="text-sm font-medium text-gray-700">Description</h4>
                 <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                   {selectedRequest.description}
                 </p>
               </div>

               <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-fme-100 text-fme-700 flex items-center justify-center font-bold text-xs mr-3">
                       {selectedRequest.initiator.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedRequest.initiator}</p>
                      <p className="text-xs text-gray-500">Initiator</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                     <p className="text-xs text-gray-500">SLA Deadline</p>
                     <p className={`text-sm font-medium ${new Date(selectedRequest.slaDeadline) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                       {selectedRequest.slaDeadline}
                     </p>
                  </div>
               </div>
            </div>

            {/* Documents Section (Placeholder) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                 <FileText size={18} className="mr-2 text-gray-500" /> Attached Documents
               </h3>
               <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer w-full md:w-auto">
                  <div className="bg-red-100 text-red-600 p-2 rounded mr-3">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Request_Supporting_Docs.pdf</p>
                    <p className="text-xs text-gray-500">2.4 MB • Uploaded by Initiator</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Workflow Timeline - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b border-gray-100 pb-2">Approval Workflow</h3>
              
              <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                {selectedRequest.workflow.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Status Icon */}
                    <div className={`absolute -left-[21px] top-0 rounded-full border-2 w-8 h-8 flex items-center justify-center bg-white 
                      ${step.status === 'approved' ? 'border-green-500 text-green-500' : 
                        step.status === 'rejected' ? 'border-red-500 text-red-500' :
                        step.status === 'current' ? 'border-blue-500 text-blue-500 ring-4 ring-blue-50' : 
                        'border-gray-300 text-gray-300'}`}>
                      {step.status === 'approved' && <CheckCircle2 size={16} />}
                      {step.status === 'rejected' && <XCircle size={16} />}
                      {step.status === 'current' && <Clock size={16} />}
                      {step.status === 'pending' && <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                    </div>

                    <div className="ml-4">
                      <p className={`text-sm font-bold ${step.status === 'current' ? 'text-blue-700' : 'text-gray-800'}`}>
                        {step.role}
                      </p>
                      
                      {step.status === 'pending' ? (
                        <p className="text-xs text-gray-400 italic mt-0.5">Awaiting Action</p>
                      ) : (
                        <>
                           <div className="flex items-center text-xs text-gray-500 mt-1">
                             <User size={12} className="mr-1" />
                             <span>{step.status === 'approved' ? 'Approved' : step.status === 'rejected' ? 'Rejected' : 'In Review'}</span>
                             {step.date && (
                               <>
                                <span className="mx-1">•</span>
                                <span>{step.date}</span>
                               </>
                             )}
                           </div>
                           {step.comment && (
                             <div className="mt-2 p-2 bg-gray-50 border border-gray-100 rounded text-xs text-gray-600 italic">
                               "{step.comment}"
                             </div>
                           )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedRequest.status !== Status.COMPLETED && selectedRequest.status !== Status.REJECTED && (
                 <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                       <AlertCircle size={16} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                       <p className="text-xs text-blue-800">
                         This request is currently with the <strong>{selectedRequest.workflow.find(w => w.status === 'current')?.role}</strong>. 
                         Expected resolution by {selectedRequest.slaDeadline}.
                       </p>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6">
       {/* Header & Controls */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Unified Requisition Portal</h2>
            <p className="text-gray-500 text-sm">Track, manage, and audit service requests across all ministry departments.</p>
          </div>
          <button 
             onClick={onNewRequest}
             className="bg-fme-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-fme-700 flex items-center shadow-sm transition-colors"
           >
             <Plus size={18} className="mr-2" />
             Create New Request
           </button>
       </div>

       {/* Filters Bar */}
       <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by reference no, description or initiator..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-fme-500 focus:outline-none transition-shadow"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
             <div className="flex items-center space-x-2 text-gray-600">
                <Filter size={18} />
                <span className="text-sm font-medium whitespace-nowrap">Filter by Dept:</span>
             </div>
             <select 
               value={selectedDept} 
               onChange={(e) => setSelectedDept(e.target.value)}
               className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-fme-500 focus:outline-none bg-white min-w-[220px]"
             >
               <option value="All">All Departments</option>
               {departments.map(d => (
                 <option key={d} value={d}>{d}</option>
               ))}
             </select>
          </div>
       </div>

       {/* Request List Table */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.length > 0 ? filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <FileText size={16} className="text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-fme-800">{req.referenceNo}</span>
                        </div>
                        <span className="text-xs text-gray-400 ml-6">{req.dateSubmitted}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="inline-block max-w-[150px] truncate" title={req.department}>{req.department}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        <div>{req.description}</div>
                        <div className="text-xs text-gray-400 mt-0.5">By: {req.initiator}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(req.status)}`}>
                         {req.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <button 
                         onClick={() => setSelectedRequest(req)}
                         className="text-fme-600 hover:text-fme-900 flex items-center justify-end w-full group"
                       >
                           <Eye size={16} className="mr-1 group-hover:scale-110 transition-transform" /> View
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-3">
                            <Search size={24} className="text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-700">No requests found</p>
                        <p className="text-sm text-gray-400 mt-1">Try adjusting your department filter or search terms.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};

export default RequisitionPortal;