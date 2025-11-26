
import React from 'react';
import { Department, RequestType } from '../types';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RequisitionForm: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Sort departments alphabetically for easier selection
  const departments = Object.values(Department).sort();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800">New Service Requisition</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requesting Department / Unit</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fme-500 focus:outline-none bg-white">
                <option value="">Select Department...</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fme-500 focus:outline-none bg-white">
                <option value="">Select Type...</option>
                {Object.values(RequestType).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject/Title</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fme-500 focus:outline-none" placeholder="e.g. Repair of Official Vehicle FME-123" />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Description & Justification</label>
             <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fme-500 focus:outline-none" placeholder="Provide detailed description of the need..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost (₦)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fme-500 focus:outline-none" placeholder="0.00" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Budget Code (If known)</label>
               <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fme-500 focus:outline-none" placeholder="e.g. 230101" />
            </div>
          </div>
          
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PDF, JPG up to 5MB</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Workflow Preview</h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-blue-700">
               <span className="bg-white px-2 py-1 rounded shadow-sm">Initiator (You)</span>
               <span>&rarr;</span>
               <span className="bg-white px-2 py-1 rounded shadow-sm">Head of Unit</span>
               <span>&rarr;</span>
               <span className="bg-white px-2 py-1 rounded shadow-sm">Relevant Service Dept (e.g. Gen. Services)</span>
               <span>&rarr;</span>
               <span className="bg-white px-2 py-1 rounded shadow-sm">Approval</span>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
           <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white transition-colors">Cancel</button>
           <button onClick={onClose} className="px-6 py-2 bg-fme-600 text-white rounded-lg hover:bg-fme-700 font-medium shadow-md transition-colors">Submit Request</button>
        </div>
      </div>
    </div>
  );
};

export default RequisitionForm;
