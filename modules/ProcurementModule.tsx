import React, { useState } from 'react';
import { MOCK_TENDERS } from '../constants';
import { FileCheck, Users, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const ProcurementModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tenders' | 'needs' | 'disposal'>('tenders');

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Procurement Department</h2>
        <div className="flex space-x-2">
          <button className="bg-fme-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Create New Tender</button>
        </div>
      </div>

       {/* Tabs */}
       <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tenders')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tenders'
                ? 'border-fme-500 text-fme-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            E-Tendering & Bids
          </button>
          <button
            onClick={() => setActiveTab('needs')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'needs'
                ? 'border-fme-500 text-fme-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Needs Assessment
          </button>
           <button
            onClick={() => setActiveTab('disposal')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'disposal'
                ? 'border-fme-500 text-fme-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Disposal of Assets
          </button>
        </nav>
      </div>

      {activeTab === 'tenders' && (
        <div className="space-y-6">
           {/* Notices Rule Alert */}
           <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3 text-sm text-blue-700">
              <Calendar size={18} className="mt-0.5 flex-shrink-0" />
              <p>Compliance Rule: Procurement notices must be advertised for a period of six (6) weeks before bid opening.</p>
           </div>

           <div className="grid gap-6">
              {MOCK_TENDERS.map(tender => (
                <div key={tender.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start">
                      <div>
                         <span className={`inline-block px-2 py-1 text-xs rounded mb-2 ${tender.category === 'Works' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                           {tender.category}
                         </span>
                         <h3 className="text-lg font-bold text-gray-900">{tender.title}</h3>
                         <p className="text-sm text-gray-500 mt-1">Closing Date: {tender.closingDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tender.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {tender.status}
                      </span>
                   </div>
                   
                   <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-6">
                         <div className="text-center">
                            <span className="block text-xl font-bold text-gray-800">{tender.bidsReceived}</span>
                            <span className="text-xs text-gray-500 uppercase">Bids Received</span>
                         </div>
                         <div className="text-center">
                             <span className="block text-xl font-bold text-gray-800">12</span>
                             <span className="text-xs text-gray-500 uppercase">Days Left</span>
                         </div>
                      </div>
                      <div className="flex space-x-2">
                         <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">View Documents</button>
                         <button className="px-3 py-1.5 bg-fme-600 text-white rounded text-sm hover:bg-fme-700">Bid Opening</button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'needs' && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Annual Needs Assessment</h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">
              Preparation and collation of departmental Needs Assessment begins at the start of each financial year.
            </p>
            <button className="mt-6 bg-fme-600 text-white px-6 py-2 rounded-lg font-medium">Initiate New Assessment Cycle</button>
        </div>
      )}

      {activeTab === 'disposal' && (
        <div className="space-y-4">
           <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-3 text-sm text-yellow-800 border border-yellow-200">
              <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
              <p>Items marked for disposal must comply with the Public Procurement Act, 2007. Boarding of unserviceable items requires Internal Audit verification.</p>
           </div>
           
           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Batch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   <tr>
                     <td className="px-6 py-4 text-sm font-medium">DSP-2024-001</td>
                     <td className="px-6 py-4 text-sm text-gray-500">Obsolete IT Equipment (Printers, Monitors)</td>
                     <td className="px-6 py-4 text-sm"><span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs">Pending Valuation</span></td>
                     <td className="px-6 py-4 text-sm"><button className="text-blue-600 hover:underline">Process</button></td>
                   </tr>
                </tbody>
              </table>
           </div>
        </div>
      )}

    </div>
  );
};

export default ProcurementModule;