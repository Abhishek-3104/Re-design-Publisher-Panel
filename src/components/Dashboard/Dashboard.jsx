// Dashboard.jsx - Updated with dummy data
import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, differenceInDays, subDays } from "date-fns";
import { FiCalendar } from "react-icons/fi";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { datePickerCustomStyles } from "./datePickerCustomStyles";

import ConversionClicksChart from "./ConversionClicksChart";
import TopPerformingCampaigns from "./TopPerformingCampaigns";
import TotalSpendReport from "./TotalSpendReport";
import GeoTargetingChart from "./GeoTargetingChart";

// Dummy data
const generateDummyGraphData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, "yyyy-MM-dd"),
      clicks: Math.floor(Math.random() * 5000) + 2000,
      conversions: Math.floor(Math.random() * 500) + 100,
      totalSpend: Math.floor(Math.random() * 10000) + 5000,
    });
  }
  return data;
};

const dummyDashboardData = {
  range: {
    from: format(subDays(new Date(), 6), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  },
  cards: {
    spends: 1250.50,
    clicks: 12450,
    conversions: 850,
    totalSpend: 45230.75,
  },
  graph: generateDummyGraphData(),
  countryGraph: [
    { country_code: "US", totalConversions: "450" },
    { country_code: "GB", totalConversions: "280" },
    { country_code: "CA", totalConversions: "320" },
    { country_code: "AU", totalConversions: "190" },
    { country_code: "DE", totalConversions: "210" },
    { country_code: "FR", totalConversions: "175" },
    { country_code: "IN", totalConversions: "520" },
    { country_code: "BR", totalConversions: "150" },
  ],
};

const Dashboard = () => {
  const firstName = "John";
  const lastName = "Doe";

  const [dateRange, setDateRange] = useState([subDays(new Date(), 6), new Date()]);
  const [startDate, endDate] = dateRange;

  const [dashboardData] = useState(dummyDashboardData);

  const handleDateChange = (update) => {
    const [start, end] = update;

    if (start && end && differenceInDays(end, start) > 14) {
      alert("Date range cannot exceed 15 days.");
      return;
    }

    setDateRange(update);
  };

  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <style>{datePickerCustomStyles}</style>

      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
            Welcome Back, {firstName} {lastName}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Here's a summary of your account's performance.
          </p>
        </div>

        <div className="relative w-full sm:w-auto sm:min-w-[280px]">
          <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={16} />
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            maxDate={startDate ? addDays(startDate, 14) : null}
            selectsDisabledDaysInRange
            className="w-full border border-gray-300 rounded-lg py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all cursor-pointer"
            dateFormat="dd MMM yyyy"
            popperPlacement="bottom-end"
            popperClassName="date-picker-popper"
          />
        </div>
      </motion.div>

      <div className="space-y-6 sm:space-y-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="lg:col-span-2">
            <ConversionClicksChart graphData={dashboardData.graph} />
          </div>
          <div className="lg:col-span-1">
            <TopPerformingCampaigns />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="lg:col-span-2">
            <TotalSpendReport graphData={dashboardData.graph} cardData={dashboardData.cards} />
          </div>
          <div className="lg:col-span-1">
            <GeoTargetingChart countryData={dashboardData.countryGraph} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;