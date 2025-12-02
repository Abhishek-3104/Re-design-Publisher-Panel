// MetricCards.jsx
import React from "react";
import {
  FiDollarSign,
  FiMousePointer,
  FiTrendingUp,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

const MetricCard = ({ icon: Icon, title, value, diff, subtitle }) => {
  const numericDiff = diff ? parseFloat(diff) : null;
  const isNegative = numericDiff !== null && numericDiff < 0;

  const getDisplayDiff = () => {
    if (!diff) return null;
    const diffString = String(diff);
    if (numericDiff > 0 && !diffString.startsWith("+")) {
      return `+${diffString}%`;
    }
    return `${diffString}%`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center">
          <Icon size={20} className="text-orange-500 sm:w-6 sm:h-6" />
        </div>

        {/* Title */}
        <div className="text-gray-500 text-sm sm:text-base font-medium">
          {title}
        </div>

        {/* Value */}
        <div className="text-gray-800 text-2xl sm:text-3xl font-bold">
          {value}
        </div>

        {/* Comparison or Subtitle */}
        {diff ? (
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full ${
                isNegative
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {getDisplayDiff()}
            </span>
            <span
              className={`text-xs sm:text-sm ${
                isNegative ? "text-red-500" : "text-green-500"
              }`}
            >
              vs. Yesterday
            </span>
          </div>
        ) : subtitle ? (
          <div className="text-xs sm:text-sm text-gray-400">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
};

const MetricCards = ({ metrics }) => {
  const cards = [
    {
      icon: FiDollarSign,
      title: "Today's Revenue",
      value: `$${metrics.todayRevenue}`,
      diff: metrics.revenueDiff,
    },
    {
      icon: FiMousePointer,
      title: "Today's Clicks",
      value: metrics.todayClicks,
      diff: metrics.clicksDiff,
    },
    {
      icon: FiTrendingUp,
      title: "ARPM",
      value: `$${metrics.arpm}`,
      diff: metrics.arpmDiff,
    },
    {
      icon: FiUsers,
      title: "ARPU",
      value: `$${metrics.arpu}`,
      diff: metrics.arpuDiff,
    },
    {
      icon: FiActivity,
      title: "Daily Active Users",
      value: metrics.todayDau,
      subtitle: "Active users today",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <MetricCard key={index} {...card} />
      ))}
    </div>
  );
};

export default MetricCards;