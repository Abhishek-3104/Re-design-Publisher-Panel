import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SidebarItem = ({ item, isExpanded, isActive, onItemClick }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }
   
  if (item.path === "logout") {
    return (
      <motion.li
        className="list-none"
        onClick={() => {
          handleLogout();
          onItemClick?.();
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className={`relative flex items-center cursor-pointer my-0.5 sm:my-1 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none ${
            isExpanded ? "px-3 sm:px-4 py-2.5 sm:py-3" : "px-2 py-2.5 sm:py-3 justify-center"
          }`}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3 sm:ml-4 text-sm font-medium whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.li>
    );
  }

  return (
    <li className="list-none relative overflow-hidden">
      <Link 
        to={item.path} 
        className="focus:outline-none"
        onClick={onItemClick}
      >
        <motion.div
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center cursor-pointer my-0.5 sm:my-1 transition-colors duration-200 ${
            isActive ? "text-white" : "text-gray-400 hover:text-white"
          } ${isExpanded ? "px-3 sm:px-4 py-2.5 sm:py-3" : "px-2 py-2.5 sm:py-3 justify-center"}`}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3 sm:ml-4 text-sm font-medium whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full"
          />
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;