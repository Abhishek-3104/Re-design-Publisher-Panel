// ImportApplicationDialog.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch, FiDownload } from "react-icons/fi";

const ImportApplicationDialog = ({ isOpen, onClose, onImport }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Dummy search results
  const dummyResults = {
    Android: [
      {
        name: "Fitness Tracker Pro",
        packageName: "com.fitness.tracker",
        category: "Health & Fitness",
        logo: "https://ui-avatars.com/api/?name=Fitness&background=10B981&color=fff",
        websiteUrl: "https://fitnesstracker.com",
        description: "Track your daily fitness activities",
      },
      {
        name: "Recipe Master",
        packageName: "com.recipe.master",
        category: "Food & Drink",
        logo: "https://ui-avatars.com/api/?name=Recipe&background=F59E0B&color=fff",
        websiteUrl: "https://recipemaster.com",
        description: "Discover and save delicious recipes",
      },
    ],
    iOS: [
      {
        name: "Budget Planner",
        packageName: "987654321",
        category: "Finance",
        logo: "https://ui-avatars.com/api/?name=Budget&background=3B82F6&color=fff",
        websiteUrl: "https://budgetplanner.com",
        description: "Manage your finances efficiently",
      },
    ],
    Web: [
      {
        name: "Task Manager Online",
        packageName: "",
        category: "Productivity",
        logo: "https://ui-avatars.com/api/?name=Task&background=8B5CF6&color=fff",
        websiteUrl: "https://taskmanager.com",
        description: "Organize your tasks and projects",
      },
    ],
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
    setSearchResults([]);
    setSearchQuery("");
  };

  const getPlaceholder = () => {
    if (selectedPlatforms.length === 0) {
      return "Select a platform first";
    }
    if (selectedPlatforms.includes("Android")) {
      return "Enter Package Name, Play Store URL, or App Name";
    }
    if (selectedPlatforms.includes("iOS")) {
      return "Enter App ID, App Store URL, or App Name";
    }
    if (selectedPlatforms.includes("Web")) {
      return "Enter Website URL";
    }
    return "Enter search query";
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || selectedPlatforms.length === 0) return;

    setIsSearching(true);
    setTimeout(() => {
      const results = selectedPlatforms.flatMap(
        (platform) => dummyResults[platform] || []
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleImport = (app) => {
    const platform = selectedPlatforms[0]; // Use first selected platform
    onImport({
      name: app.name,
      category: app.category,
      logo: app.logo,
      websiteUrl: app.websiteUrl,
      platform: platform,
      packageName: app.packageName,
      description: app.description,
    });
  };

  const handleClose = () => {
    setSelectedPlatforms([]);
    setSearchQuery("");
    setSearchResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Import Application
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiX size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Platform
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Android", "iOS", "Web"].map((platform) => (
                    <label
                      key={platform}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {platform}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Application
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    disabled={selectedPlatforms.length === 0}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder={getPlaceholder()}
                  />
                  <button
                    onClick={handleSearch}
                    disabled={
                      selectedPlatforms.length === 0 || !searchQuery.trim()
                    }
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <FiSearch size={16} />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>

              {/* Search Results */}
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Search Results ({searchResults.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.map((app, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={app.logo}
                          alt={app.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">
                            {app.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {app.category}
                          </p>
                        </div>
                        <button
                          onClick={() => handleImport(app)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex-shrink-0"
                        >
                          <FiDownload size={14} />
                          Import
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                searchQuery && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <FiSearch size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">No results found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try a different search query
                    </p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImportApplicationDialog;