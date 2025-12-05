import React from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiEye } from "react-icons/fi";
import { format, parseISO } from "date-fns";

const ApplicationsTable = ({
  applications,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  onEdit,
  onView,
  onPageChange,
}) => {
  const getStatusBadge = (status) => {
    const badges = {
      Active: {
        bg: "bg-green-50",
        text: "text-green-700",
        dot: "bg-green-500",
      },
      "In Review": {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        dot: "bg-yellow-500",
      },
      "In Testing": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        dot: "bg-blue-500",
      },
    };

    const badge = badges[status] || badges.Active;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
        {status}
      </span>
    );
  };

  const getPlatformBadge = (platform) => {
    const badges = {
      Android: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
      },
      iOS: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
      },
      Web: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
      },
    };

    const badge = badges[platform] || badges.Web;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
      >
        {platform}
      </span>
    );
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by adding your first application or try adjusting your
            filters to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Table */}
      <div className="lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Application
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Platform
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created On
                  </span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app, index) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  {/* Serial Number */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-500">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </span>
                  </td>

                  {/* Application Name & Logo */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={app.logo}
                          alt={app.name}
                          className="w-11 h-11 rounded-xl object-cover ring-2 ring-gray-100"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {app.name}
                        </p>
                        {app.category && (
                          <p className="text-xs text-gray-500 truncate">
                            {app.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlatformBadge(app.platform)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(app.status)}
                  </td>

                  {/* Created On */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(parseISO(app.createdOn), "MMM dd, yyyy")}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(app)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                        title="View Details"
                      >
                        <FiEye size={14} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => onEdit(app)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:shadow-sm"
                        title="Edit Application"
                      >
                        <FiEdit2 size={14} />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Results Counter */}
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">{totalItems}</span>{" "}
                results
              </p>

              {/* Simple Next/Prev Buttons */}
              {totalPages > 1 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      onPageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationsTable;