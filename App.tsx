import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FinanceModule from './modules/FinanceModule';
import GeneralServicesModule from './modules/GeneralServices.tsx';
import ProcurementModule from './modules/ProcurementModule';
import RequisitionForm from './components/RequisitionForm';
import RequisitionPortal from './components/RequisitionPortal';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isRequisitionModalOpen, setRequisitionModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'finance':
        return <FinanceModule />;
      case 'general-services':
        return <GeneralServicesModule />;
      case 'procurement':
        return <ProcurementModule />;
      case 'requisition':
         return <RequisitionPortal onNewRequest={() => setRequisitionModalOpen(true)} />;
      case 'stores':
        return (
          <div className="p-10 text-center text-gray-500">
            <h2 className="text-2xl font-bold text-gray-400">Stores & Inventory Module</h2>
            <p>Under Development</p>
          </div>
        )
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
        {renderContent()}
      </Layout>
      <RequisitionForm isOpen={isRequisitionModalOpen} onClose={() => setRequisitionModalOpen(false)} />
    </>
  );
};

export default App;