// TopPerformingCampaigns.jsx - Updated with dummy data
import React, { useState } from "react";
import { FiImage, FiTrendingUp } from "react-icons/fi";

const StatusBadge = ({ status }) => {
  const statuses = {
    1: { text: "Active", classes: "bg-green-100 text-green-700" },
    2: { text: "Disabled", classes: "bg-gray-100 text-gray-700" },
    3: { text: "In Draft", classes: "bg-blue-100 text-blue-700" },
    4: { text: "Capped", classes: "bg-yellow-100 text-yellow-700" },
    5: { text: "In Review", classes: "bg-purple-100 text-purple-700" },
  };
  const currentStatus = statuses[status] || {
    text: "Unknown",
    classes: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap ${currentStatus.classes}`}
    >
      {currentStatus.text}
    </span>
  );
};

// Dummy data
const dummyCampaigns = [
  {
    campaign_id: 1,
    campaign: {
      name: "Summer Sale 2024",
      logo_url: "",
      status: 1,
    },
    growth: "+12.5%",
  },
  {
    campaign_id: 2,
    campaign: {
      name: "Mobile App Launch",
      logo_url: "",
      status: 1,
    },
    growth: "+8.3%",
  },
  {
    campaign_id: 3,
    campaign: {
      name: "Holiday Special",
      logo_url: "",
      status: 4,
    },
    growth: "+15.7%",
  },
  {
    campaign_id: 4,
    campaign: {
      name: "Brand Awareness",
      logo_url: "",
      status: 1,
    },
    growth: "+6.2%",
  },
  {
    campaign_id: 5,
    campaign: {
      name: "Product Demo",
      logo_url: "",
      status: 5,
    },
    growth: "+10.1%",
  },
];

const TopPerformingCampaigns = () => {
  const [campaigns] = useState(dummyCampaigns);

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800">Top Campaigns</h3>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {campaigns.length > 0 ? (
          campaigns.map((item) => (
            <div
              key={item.campaign_id}
              className="flex justify-between items-center py-2 px-1.5 sm:px-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                  src={
                    item.campaign.logo_url ||
                    `https://ui-avatars.com/api/?name=${item.campaign.name}&background=FFEDD5&color=C2410C`
                  }
                  alt={`${item.campaign.name} logo`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${item.campaign.name}&background=FFEDD5&color=C2410C`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm text-gray-800 truncate cursor-pointer">
                    {item.campaign.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <FiTrendingUp className="text-blue-500 flex-shrink-0" size={11} />
                    <span className="text-[10px] sm:text-xs font-medium text-blue-500">
                      {item.growth}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500 hidden xs:inline">vs yesterday</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                <StatusBadge status={item.campaign.status} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full min-h-[200px] text-center text-gray-500">
            <FiImage size={20} className="mb-2 sm:mb-3 sm:w-6 sm:h-6" />
            <p className="text-xs sm:text-sm font-medium">No campaigns found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPerformingCampaigns;