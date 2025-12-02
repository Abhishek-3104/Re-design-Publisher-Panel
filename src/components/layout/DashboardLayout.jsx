import React, { useEffect, useRef, useState } from 'react'; 
import { useLocation, Outlet } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const loadingBarRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
      const timer = setTimeout(() => {
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="bg-slate-50 min-h-screen text-gray-800">
      <LoadingBar
        color='#F97316'
        ref={loadingBarRef}
        height={3}
        shadow={true}
      />

      <Sidebar
        isExpanded={isSidebarExpanded}
        setExpanded={setSidebarExpanded}
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />
      
      <main
        className={`transition-all duration-300 ${
          isSidebarExpanded ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;