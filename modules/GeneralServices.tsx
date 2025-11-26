import React, { useState } from 'react';
import { MOCK_VEHICLES } from '../constants';
import { Car, Wrench, Shield, Home, Plus, ArrowLeft, Save, History } from 'lucide-react';

const GeneralServicesModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'maintenance' | 'security' | 'facility'>('vehicles');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  // Mock state for maintenance logs
  const [logs, setLogs] = useState([
    { id: 1, vehicleId: '1', date: '2024-02-10', type: 'Routine Service', cost: 45000, notes: 'Oil change, filter replacement, general inspection.' },
    { id: 2, vehicleId: '1', date: '2024-04-15', type: 'Repair', cost: 12000, notes: 'Fixed broken tail light.' },
    { id: 3, vehicleId: '2', date: '2024-01-20', type: 'Major Service', cost: 150000, notes: 'Engine tuning, tyre alignment, brake pad replacement.' },
  ]);

  const [newLog, setNewLog] = useState({ date: '', type: '', cost: '', notes: '' });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVehicleId && newLog.date && newLog.type && newLog.cost) {
      const log = {
        id: logs.length + 1,
        vehicleId: selectedVehicleId,
        date: newLog.date,
        type: newLog.type,
        cost: parseInt(newLog.cost),
        notes: newLog.notes
      };
      setLogs([log, ...logs]);
      setNewLog({ date: '', type: '', cost: '', notes: '' });
    }
  };

  const selectedVehicle = MOCK_VEHICLES.find(v => v.id === selectedVehicleId);
  const vehicleLogs = logs.filter(l => l.vehicleId === selectedVehicleId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">General Services Department</h2>
        {!selectedVehicleId && (
          <button className="bg-fme-600 hover:bg-fme-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors">
            <Plus size={16} />
            <span>New Requisition</span>
          </button>
        )}
      </div>

      {/* Tabs - Only show when not in detail view */}
      {!selectedVehicleId && (
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-max">
          <button 
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'vehicles' ? 'bg-white text-fme-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
          >
            <div className="flex items-center space-x-2">
              <Car size={16} />
              <span>Transport & Vehicles</span>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'maintenance' ? 'bg-white text-fme-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
          >
             <div className="flex items-center space-x-2">
              <Wrench size={16} />
              <span>Maintenance & Works</span>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'security' ? 'bg-white text-fme-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
          >
             <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>Security</span>
            </div>
          </button>
           <button 
            onClick={() => setActiveTab('facility')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'facility' ? 'bg-white text-fme-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
          >
             <div className="flex items-center space-x-2">
              <Home size={16} />
              <span>Facilities (Cleaning)</span>
            </div>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === 'vehicles' && (
          <div className="p-6">
            {!selectedVehicleId ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Fleet Management</h3>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">12 Active</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">2 Maintenance</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plate Number</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Driver</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fuel Level</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_VEHICLES.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{vehicle.plateNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{vehicle.model}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{vehicle.driver}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                               <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                 <div className={`h-full ${vehicle.fuelLevel < 25 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${vehicle.fuelLevel}%` }}></div>
                               </div>
                               <span className="text-xs">{vehicle.fuelLevel}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              vehicle.status === 'Active' ? 'bg-green-100 text-green-700' : 
                              vehicle.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {vehicle.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button 
                              onClick={() => setSelectedVehicleId(vehicle.id)}
                              className="text-fme-600 hover:text-fme-800 font-medium text-xs flex items-center"
                            >
                              <History size={14} className="mr-1" /> View Log
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              // Vehicle Maintenance History Detail View
              selectedVehicle && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center space-x-4 mb-6 border-b border-gray-100 pb-4">
                    <button 
                      onClick={() => setSelectedVehicleId(null)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{selectedVehicle.plateNumber} - Maintenance Log</h3>
                      <p className="text-sm text-gray-500">{selectedVehicle.model} • Driver: {selectedVehicle.driver}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log Form */}
                    <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg h-fit border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Plus size={18} className="mr-2 text-fme-600" /> 
                        Log New Maintenance
                      </h4>
                      <form onSubmit={handleAddLog} className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                          <input 
                            type="date" 
                            required
                            value={newLog.date}
                            onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-fme-500 focus:border-fme-500 outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Service Type</label>
                          <select 
                            required
                            value={newLog.type}
                            onChange={(e) => setNewLog({...newLog, type: e.target.value})}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-fme-500 focus:border-fme-500 outline-none"
                          >
                            <option value="">Select Type</option>
                            <option value="Routine Service">Routine Service</option>
                            <option value="Repair">Repair</option>
                            <option value="Major Service">Major Service</option>
                            <option value="Inspection">Inspection</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Cost (₦)</label>
                          <input 
                            type="number" 
                            required
                            min="0"
                            value={newLog.cost}
                            onChange={(e) => setNewLog({...newLog, cost: e.target.value})}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-fme-500 focus:border-fme-500 outline-none" 
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Notes/Description</label>
                          <textarea 
                            rows={3}
                            required
                            value={newLog.notes}
                            onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-fme-500 focus:border-fme-500 outline-none"
                            placeholder="Details of work done..."
                          ></textarea>
                        </div>
                        <button 
                          type="submit" 
                          className="w-full bg-fme-600 text-white py-2 rounded-md text-sm font-medium hover:bg-fme-700 flex items-center justify-center transition-colors"
                        >
                          <Save size={16} className="mr-2" /> Save Record
                        </button>
                      </form>
                    </div>

                    {/* History Table */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <History size={18} className="mr-2 text-fme-600" /> 
                        Service History
                      </h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost (₦)</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {vehicleLogs.length > 0 ? (
                              vehicleLogs.map((log) => (
                                <tr key={log.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{log.date}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">{log.type}</span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                    {log.cost.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={log.notes}>
                                    {log.notes}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                                  No maintenance records found for this vehicle.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Repairs & Installation Tracking</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border rounded-lg bg-gray-50">
                   <p className="text-sm font-medium text-gray-500">Pending Repairs</p>
                   <p className="text-2xl font-bold">5</p>
                </div>
                 <div className="p-4 border rounded-lg bg-gray-50">
                   <p className="text-sm font-medium text-gray-500">Completed (This Month)</p>
                   <p className="text-2xl font-bold">12</p>
                </div>
             </div>
             
             <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                <p>No active critical maintenance tickets.</p>
             </div>
          </div>
        )}

        {activeTab === 'security' && (
             <div className="p-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Deployment & Allowances</h3>
               <p className="text-sm text-gray-600 mb-4">Manage allowances for security operatives and track deployment locations.</p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Workflow</h4>
                  <p className="text-sm text-blue-700">Security Officer initiates &rarr; Chief Admin Officer &rarr; Audit &rarr; Finance Payment</p>
                </div>
             </div>
        )}

        {activeTab === 'facility' && (
           <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cleaning & Fumigation Schedule</h3>
              <div className="flex space-x-4 mb-6">
                 <div className="flex-1 bg-white border p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 uppercase">Next Fumigation</p>
                    <p className="text-lg font-semibold mt-1">June 15, 2024</p>
                    <p className="text-xs text-green-600 mt-2">Vendor: CleanPro Ltd</p>
                 </div>
                 <div className="flex-1 bg-white border p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 uppercase">Office Space Requests</p>
                    <p className="text-lg font-semibold mt-1">2 Pending</p>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default GeneralServicesModule;