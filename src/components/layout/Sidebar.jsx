// Sidebar.jsx - Updated with new menu items
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiGrid,
  FiBell,
  FiX,
  FiLayers,
} from "react-icons/fi";
import { scrollbarStyles } from "./customScrollbarStyles";

const Sidebar = ({ isExpanded, setExpanded, isMobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItemId, setActiveItemId] = useState(null);

  const mainItems = [
    { name: "Dashboard", icon: <FiHome size={22} />, path: "/dashboard" },
    {
      name: "Applications",
      icon: <FiGrid size={22} />,
      path: "/dashboard/applications",
    },
    {
      name: "Placements",
      icon: <FiLayers size={22} />,
      path: "/dashboard/placements",
    },
    {
      name: "Notifications",
      icon: <FiBell size={22} />,
      path: "/dashboard/notifications",
    },
  ];

  const accountItems = [
    { name: "Profile", icon: <FiUser size={22} />, path: "/dashboard/profile" },
    { name: "Logout", icon: <FiLogOut size={22} />, path: "logout" },
  ];

  useEffect(() => {
    mainItems.forEach((item) => {
      if (item.path && location.pathname === item.path) {
        setActiveItemId(item.path);
      }
    });

    accountItems.forEach((item) => {
      if (location.pathname === item.path) {
        setActiveItemId(item.path);
      }
    });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleItemClick = (path) => {
    setActiveItemId(path);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      <style>{scrollbarStyles}</style>

      <div
        className={`flex items-center gap-3 ${
          isExpanded ? "justify-between" : "justify-center"
        } p-3 sm:p-4 border-b border-gray-800 h-14 sm:h-16`}
      >
          {isExpanded && (
            <motion.h1 className="text-xl sm:text-2xl font-bold flex gap-2">
              <img
                src="/logo.svg"
                alt="Logo"
                className="text-white h-6 sm:h-auto"
              />
            </motion.h1>
          )}
        <button
          onClick={() => setExpanded(!isExpanded)}
          className="hidden lg:flex p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none transition-colors cursor-pointer"
        >
          {isExpanded ? <FiArrowLeft size={18} /> : <FiArrowRight size={18} />}
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none transition-colors cursor-pointer"
        >
          <FiX size={20} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-between py-3 sm:py-4 overflow-hidden">
        <div className="custom-scrollbar overflow-y-auto flex-1">
          <ul className="list-none">
            {mainItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="list-none relative">
                  <Link
                    to={item.path}
                    className="focus:outline-none"
                    onClick={() => handleItemClick(item.path)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center cursor-pointer my-0.5 sm:my-1 transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      } ${
                        isExpanded
                          ? "px-3 sm:px-4 py-2.5 sm:py-3"
                          : "px-2 py-2.5 sm:py-3 justify-center"
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                        {isExpanded && (
                          <motion.span className="ml-3 sm:ml-4 text-sm font-medium whitespace-nowrap">
                            {item.name}
                          </motion.span>
                        )}
                    </motion.div>
                    {isActive && activeItemId === item.path && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <hr className="my-3 sm:my-4 border-gray-800" />
          <ul className="list-none">
            {accountItems.map((item) => {
              const isActive = location.pathname === item.path;

              if (item.path === "logout") {
                return (
                  <motion.li
                    key={item.name}
                    className="list-none"
                    onClick={handleLogout}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`relative flex items-center cursor-pointer my-0.5 sm:my-1 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none ${
                        isExpanded
                          ? "px-3 sm:px-4 py-2.5 sm:py-3"
                          : "px-2 py-2.5 sm:py-3 justify-center"
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                        {isExpanded && (
                          <motion.span
                            className="ml-3 sm:ml-4 text-sm font-medium whitespace-nowrap"
                          >
                            {item.name}
                          </motion.span>
                        )}
                    </div>
                  </motion.li>
                );
              }

              return (
                <li key={item.name} className="list-none relative">
                  <Link
                    to={item.path}
                    className="focus:outline-none"
                    onClick={() => handleItemClick(item.path)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center cursor-pointer my-0.5 sm:my-1 transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      } ${
                        isExpanded
                          ? "px-3 sm:px-4 py-2.5 sm:py-3"
                          : "px-2 py-2.5 sm:py-3 justify-center"
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.span
                            className="ml-3 sm:ml-4 text-sm font-medium whitespace-nowrap"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    {isActive && activeItemId === item.path && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <motion.aside
        animate={{ width: isExpanded ? "16rem" : "5rem" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden lg:flex bg-black text-white h-screen fixed top-0 left-0 flex-col z-50"
      >
        <SidebarContent />
      </motion.aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-black text-white h-screen fixed top-0 left-0 w-64 flex flex-col z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;