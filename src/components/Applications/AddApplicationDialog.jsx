// AddApplicationDialog.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUpload, FiDownload } from "react-icons/fi";

const AddApplicationDialog = ({
  isOpen,
  onClose,
  onSubmit,
  onImportClick,
  editingApp,
  importedData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    logo: "",
    websiteUrl: "",
    platform: "",
    packageName: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingApp) {
      setFormData({
        name: editingApp.name || "",
        category: editingApp.category || "",
        logo: editingApp.logo || "",
        websiteUrl: editingApp.websiteUrl || "",
        platform: editingApp.platform || "",
        packageName: editingApp.packageName || "",
        description: editingApp.description || "",
      });
    } else if (importedData) {
      setFormData({
        name: importedData.name || "",
        category: importedData.category || "",
        logo: importedData.logo || "",
        websiteUrl: importedData.websiteUrl || "",
        platform: importedData.platform || "",
        packageName: importedData.packageName || "",
        description: importedData.description || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        logo: "",
        websiteUrl: "",
        platform: "",
        packageName: "",
        description: "",
      });
    }
    setErrors({});
  }, [editingApp, importedData, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.platform) newErrors.platform = "Platform is required";
    
    // Package name mandatory for Android/iOS
    if ((formData.platform === "Android" || formData.platform === "iOS") && 
        !formData.packageName.trim()) {
      newErrors.packageName = "Package Name/App ID is required for Android/iOS";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        status: editingApp?.status || "In Review",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
            onClick={onClose}
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
                {editingApp ? "Edit Application" : "Add Application"}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={onImportClick}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FiDownload size={16} />
                  <span className="hidden sm:inline">Import</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiX size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-4 sm:p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="Enter application name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none  focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="e.g., Health & Fitness, Travel, etc."
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Application Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Logo URL
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                {/* Website URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Website URL
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.platform ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none  focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  >
                    <option value="">Select platform</option>
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                    <option value="Web">Web</option>
                  </select>
                  {errors.platform && (
                    <p className="text-red-500 text-xs mt-1">{errors.platform}</p>
                  )}
                </div>

                {/* Package Name/App ID */}
                {(formData.platform === "Android" || formData.platform === "iOS") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.platform === "Android" ? "Package Name" : "App ID"}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="packageName"
                      value={formData.packageName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.packageName ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none  focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                      placeholder={
                        formData.platform === "Android"
                          ? "com.example.app"
                          : "123456789"
                      }
                    />
                    {errors.packageName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.packageName}
                      </p>
                    )}
                  </div>
                )}

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Brief description of your application"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingApp ? "Update Application" : "Add Application"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddApplicationDialog;