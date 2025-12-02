// Dashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, subMonths } from "date-fns";
import { FiRefreshCw } from "react-icons/fi";

import MetricCards from "./MetricCards";
import RevenueGraph from "./RevenueGraph";
import GeoDistributionMap from "./GeoDistributionMap";

// Generate dummy data for last 6 months
const generateDummyRevenueGraph = () => {
  const data = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    data.push({
      month: format(date, "yyyy-MM"),
      totalRevenue: (Math.random() * 50 + 30).toFixed(2),
    });
  }
  return data;
};

const dummyDashboardData = {
  metrics: {
    todayRevenue: "1,245.50",
    revenueDiff: "+12.5",
    todayClicks: "8,542",
    clicksDiff: "+8.3",
    arpm: "2.45",
    arpmDiff: "+5.2",
    arpu: "0.85",
    arpuDiff: "-2.1",
    todayDau: "12,450",
  },
  totalRevenue: "45,230.75",
  revenueGraph: generateDummyRevenueGraph(),
  geoData: [
    { country_code: "US", country_name: "United States", activeUsers: 4500 },
    { country_code: "GB", country_name: "United Kingdom", activeUsers: 2800 },
    { country_code: "CA", country_name: "Canada", activeUsers: 3200 },
    { country_code: "AU", country_name: "Australia", activeUsers: 1900 },
    { country_code: "DE", country_name: "Germany", activeUsers: 2100 },
    { country_code: "FR", country_name: "France", activeUsers: 1750 },
    { country_code: "IN", country_name: "India", activeUsers: 5200 },
    { country_code: "BR", country_name: "Brazil", activeUsers: 1500 },
  ],
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dummyDashboardData);
  const [refreshing, setRefreshing] = useState(false);

  const firstName = "John";
  const lastName = "Doe";

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setDashboardData({
        ...dummyDashboardData,
        revenueGraph: generateDummyRevenueGraph(),
      });
      setRefreshing(false);
    }, 500);
  };

  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
            Welcome Back, {firstName} {lastName}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Here's a summary of your account's performance.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2.5 sm:p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRefreshCw
            size={20}
            className={`text-gray-600 ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <MetricCards metrics={dashboardData.metrics} />
      </motion.div>

      {/* Bottom Section: Revenue Graph & Geo Map */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Revenue Graph - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RevenueGraph
            totalRevenue={dashboardData.totalRevenue}
            revenueGraph={dashboardData.revenueGraph}
          />
        </div>

        {/* Geo Distribution - Takes 1 column */}
        <div className="lg:col-span-1">
          <GeoDistributionMap geoData={dashboardData.geoData} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;