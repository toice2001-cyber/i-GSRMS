import React from 'react';
import { MOCK_BUDGET, MOCK_REQUESTS } from '../constants';
import { Department, RequestType } from '../types';
import { Wallet, PieChart as PieIcon, FileText, AlertCircle } from 'lucide-react';

const FinanceModule: React.FC = () => {
  const paymentRequests = MOCK_REQUESTS.filter(r => r.department === Department.FINANCE || r.type === RequestType.PAYMENT_VOUCHER);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Finance & Accounts</h2>
           <p className="text-gray-500 text-sm mt-1">Directorate of Finance and Accounts</p>
        </div>
        <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Generate Report</button>
            <button className="px-4 py-2 bg-fme-600 text-white rounded-lg text-sm font-medium hover:bg-fme-700">New Payment Voucher</button>
        </div>
      </div>

      {/* Budget Overview */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
           <PieIcon className="text-fme-600" size={20} />
           <h3 className="text-lg font-semibold text-gray-800">Budget Performance Monitoring</h3>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated (₦)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Utilized (₦)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance (₦)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_BUDGET.map((line) => {
                  const percent = Math.round((line.utilized / line.allocated) * 100);
                  return (
                    <tr key={line.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{line.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{line.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${line.type === 'Capital' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {line.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{line.allocated.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{line.utilized.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{line.balance.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <div className="flex items-center justify-center">
                           <span className={`font-bold ${percent > 90 ? 'text-red-600' : 'text-green-600'}`}>{percent}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
      </section>

      {/* Payment Processing */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
           <Wallet className="text-fme-600" size={20} />
           <h3 className="text-lg font-semibold text-gray-800">Pending Payment Vouchers</h3>
        </div>

        <div className="grid gap-4">
          {paymentRequests.length > 0 ? paymentRequests.map(req => (
            <div key={req.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1">
                   <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{req.referenceNo}</span>
                      <span className="text-xs text-gray-400">{req.dateSubmitted}</span>
                   </div>
                   <h4 className="font-medium text-gray-900">{req.description}</h4>
                   <p className="text-sm text-gray-500 mt-1">Initiator: {req.initiator} • Amount: <span className="font-semibold text-gray-800">₦{req.amount?.toLocaleString()}</span></p>
                   
                   {/* Workflow Visualization */}
                   <div className="mt-3 flex items-center space-x-1 text-xs text-gray-500">
                      <span className="font-medium">Current Step:</span>
                      {req.workflow.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                           <span className={`${step.status === 'approved' ? 'text-green-600 line-through' : step.status === 'current' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                             {step.role}
                           </span>
                           {idx < req.workflow.length - 1 && <span className="mx-1">&rarr;</span>}
                        </div>
                      ))}
                   </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-2">
                   <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100">
                     <FileText size={18} />
                   </button>
                   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                     Review
                   </button>
                </div>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              No pending payment vouchers found.
            </div>
          )}
        </div>
      </section>
      
      {/* Audit Queries Section */}
      <section className="bg-orange-50 rounded-xl p-6 border border-orange-100">
         <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="text-orange-600" size={20} />
            <h3 className="text-lg font-semibold text-orange-800">Audit Queries & Responses</h3>
         </div>
         <p className="text-sm text-orange-700 mb-4">
           There are 3 unanswered audit queries from Internal Audit Department (Prepayment Audit).
         </p>
         <button className="text-sm font-medium text-orange-800 hover:underline">View Queries &rarr;</button>
      </section>
    </div>
  );
};

export default FinanceModule;