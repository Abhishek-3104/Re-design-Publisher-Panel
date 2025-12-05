// FilterSortBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiChevronDown, FiPlus } from "react-icons/fi";
import { BiSort } from "react-icons/bi";

const FilterSortBar = ({ filters, setFilters, sortBy, setSortBy, onAddClick }) => {
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showPlatformFilter, setShowPlatformFilter] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const statusRef = useRef(null);
  const platformRef = useRef(null);
  const sortRef = useRef(null);

  const statusOptions = ["Active", "In Review", "In Testing"];
  const platformOptions = ["Android", "iOS", "Web"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setShowStatusFilter(false);
      }
      if (platformRef.current && !platformRef.current.contains(event.target)) {
        setShowPlatformFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusToggle = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const handlePlatformToggle = (platform) => {
    setFilters((prev) => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter((p) => p !== platform)
        : [...prev.platform, platform],
    }));
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
      {/* Filter by Status */}
      <div className="relative" ref={statusRef}>
        <button
          onClick={() => setShowStatusFilter(!showStatusFilter)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
        >
          <FiFilter size={16} className="text-gray-600" />
          <span className="text-gray-700">Status</span>
          {filters.status.length > 0 && (
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-medium">
              {filters.status.length}
            </span>
          )}
          <FiChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${
              showStatusFilter ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {showStatusFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20"
            >
              {statusOptions.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusToggle(status)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter by Platform */}
      <div className="relative" ref={platformRef}>
        <button
          onClick={() => setShowPlatformFilter(!showPlatformFilter)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
        >
          <FiFilter size={16} className="text-gray-600" />
          <span className="text-gray-700">Platform</span>
          {filters.platform.length > 0 && (
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-medium">
              {filters.platform.length}
            </span>
          )}
          <FiChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${
              showPlatformFilter ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {showPlatformFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20"
            >
              {platformOptions.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.platform.includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{platform}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort By */}
      <div className="relative" ref={sortRef}>
        <button
          onClick={() => setShowSortMenu(!showSortMenu)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
        >
          <BiSort size={16} className="text-gray-600" />
          <span className="text-gray-700 hidden sm:inline">
            {sortOptions.find((s) => s.value === sortBy)?.label}
          </span>
          <span className="text-gray-700 sm:hidden">Sort</span>
          <FiChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${
              showSortMenu ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {showSortMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-20"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md text-sm transition-colors ${
                    sortBy === option.value
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Application Button */}
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm text-sm font-medium"
      >
        <FiPlus size={18} />
        <span>Add Application</span>
      </button>
    </div>
  );
};

export default FilterSortBar;