import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Building2, 
  ShoppingCart, 
  Package, 
  Bell, 
  Search,
  Menu,
  User,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeModule, setActiveModule }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requisition', label: 'Requisition Portal', icon: Package },
    { id: 'general-services', label: 'General Services', icon: Building2 },
    { id: 'finance', label: 'Finance & Accounts', icon: Wallet },
    { id: 'procurement', label: 'Procurement', icon: ShoppingCart },
    { id: 'stores', label: 'Stores & Inventory', icon: Package },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-fme-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 bg-fme-800">
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight">i-GSRMS</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-fme-700 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeModule === item.id 
                      ? 'bg-fme-500 text-white shadow-md' 
                      : 'text-gray-300 hover:bg-fme-800 hover:text-white'
                  }`}
                >
                  <item.icon size={22} />
                  {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-fme-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-fme-500 flex items-center justify-center text-sm font-bold">
              AO
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin Officer</p>
                <p className="text-xs text-gray-400 truncate">admin@fme.gov.ng</p>
              </div>
            )}
            {isSidebarOpen && <LogOut size={16} className="text-gray-400 cursor-pointer hover:text-white" />}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
             Federal Ministry of Education
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search requests, files..." 
                className="pl-10 pr-4 py-2 border rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-fme-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <span className="text-sm text-gray-500 font-medium">Department: General Services</span>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;