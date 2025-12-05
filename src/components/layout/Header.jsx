import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiLock,
  FiLogOut,
  FiPlus,
  FiUsers,
  FiMenu,
} from "react-icons/fi";

const Header = ({ onMenuClick }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const notifications = [];

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Placeholder data for UI
  const firstName = "John";
  const lastName = "Doe";
  const profilePicture = "";
  const availableFunds = 1250.50;

  const pageTitle = useMemo(() => {
    const { pathname } = location;

    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/profile':
        return 'Profile';
      case '/dashboard/applications':
        return 'Applications';
      case '/dashboard/team-members':
        return 'Team Members';
      default:
        return 'Dashboard';
    }
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleProfileMenuClick = (hash) => {
    setProfileOpen(false);
    
    if (location.pathname === '/dashboard/profile') {
      window.history.pushState(null, '', '/dashboard/profile' + hash);
      
      setTimeout(() => {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);
        
        if (element) {
          const headerHeight = 64;
          const additionalPadding = 24;
          const totalOffset = headerHeight + additionalPadding;
          
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      navigate(`/dashboard/profile${hash}`);
    }
  };

  const handleTeamMembersClick = () => {
    setProfileOpen(false);
    navigate('/dashboard/team-members');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
        
        {/* Left side: Menu + Title */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer"
            aria-label="Open menu"
          >
            <FiMenu size={20} className="text-gray-600" />
          </button>

          {/* Dynamic Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0"
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
              {pageTitle}
            </h1>
          </motion.div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0">

          {/* Available Funds */}
          <button
            className="hidden xl:flex items-center bg-gray-50 border border-gray-200 rounded-full p-1 pr-2.5 lg:pr-3 transition-all duration-200 hover:shadow-sm hover:bg-white cursor-pointer"
          >
            <div className="flex items-center gap-1.5 lg:gap-2">
              <div className="flex items-center justify-center h-5 w-5 lg:h-6 lg:w-6 rounded-full bg-green-100 flex-shrink-0">
                <FiPlus size={12} className="text-green-600 lg:w-[14px] lg:h-[14px]" />
              </div>
              <div>
                <p className="text-[10px] lg:text-xs text-gray-500 whitespace-nowrap">Available Funds</p>
                <p
                  className={`text-xs lg:text-sm font-semibold whitespace-nowrap ${
                    availableFunds < 0 ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {availableFunds.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </button>

          {/* Notification Button & Dropdown */}
          <div className="relative" ref={notificationRef}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!isNotificationsOpen)}
              aria-label="Notifications"
              className="relative p-2 sm:p-2.5 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 hover:shadow-sm hover:bg-white cursor-pointer"
            >
              <FiBell size={18} className="text-gray-600 sm:w-5 sm:h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
              )}
            </motion.button>
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 origin-top-right z-20"
                >
                  <div className="p-2.5 sm:p-3 border-b border-gray-200">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>
                  {notifications.length > 0 ? (
                    <ul className="p-2 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="p-2 text-xs sm:text-sm text-gray-600 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <p className="font-medium text-gray-800">
                            {notif.text}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.time}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                      <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gray-100 mb-2 sm:mb-3">
                        <FiBell size={24} className="text-gray-400 sm:w-7 sm:h-7" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1">
                        No notifications
                      </p>
                      <p className="text-xs text-gray-500 text-center">
                        You're all caught up! We'll notify you when something
                        new arrives.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Button & Dropdown */}
          <div
            className="relative"
            ref={profileRef}
            onMouseEnter={() => window.innerWidth >= 640 && setProfileOpen(true)}
            onMouseLeave={() => window.innerWidth >= 640 && setProfileOpen(false)}
          >
            <div 
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group border border-gray-200 bg-gray-50 rounded-full p-1 sm:p-1.5 sm:pr-3 transition-all duration-200 hover:shadow-md hover:bg-white"
            >
              <img
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover flex-shrink-0 cursor-pointer"
                src={
                  profilePicture
                    ? profilePicture
                    : `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=F97316&color=FFFFFF`
                }
                alt="User avatar"
              />
              <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-800 max-w-[80px] lg:max-w-none truncate">
                Hi, {firstName}
              </span>
              <FiChevronDown
                size={14}
                className={`hidden sm:block text-gray-600 transition-transform duration-200 flex-shrink-0 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute top-full right-0 mt-2 w-52 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-2 origin-top-right z-20"
                >
                  <ul className="space-y-0.5 sm:space-y-1">
                    <li>
                      <button
                        onClick={() => handleProfileMenuClick('#change-password')}
                        className="w-full flex items-center p-1.5 sm:p-2 text-xs sm:text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <FiLock size={14} className="text-gray-500 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="ml-2 sm:ml-3">Change Password</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleTeamMembersClick}
                        className="w-full flex items-center p-1.5 sm:p-2 text-xs sm:text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <FiUsers size={14} className="text-gray-500 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="ml-2 sm:ml-3">Team Members</span>
                      </button>
                    </li>
                    <div className="h-px bg-gray-200 my-1"></div>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center p-1.5 sm:p-2 text-xs sm:text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <FiLogOut size={14} className="text-red-500 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="ml-2 sm:ml-3 font-medium">Logout</span>
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;