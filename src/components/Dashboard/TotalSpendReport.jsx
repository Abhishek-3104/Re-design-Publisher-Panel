// TotalSpendReport.jsx - No changes needed, already receives props
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

const SpendTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 sm:p-3 rounded-md shadow-lg border border-gray-200">
        <p className="text-[10px] sm:text-xs text-gray-500 font-medium mb-1">{label}</p>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full flex-shrink-0"></span>
          <p className="text-xs sm:text-sm text-gray-500">Spend:</p>
          <p className="text-xs sm:text-sm font-bold text-gray-800">
            {payload[0].value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const StatCard = ({ title, value }) => {
  const formatValue = (num) => {
    if (title.toLowerCase().includes("spend")) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    return num.toLocaleString("en-US");
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200">
      <p className="text-xs sm:text-sm text-orange-500 font-medium">{title}</p>
      <div className="flex items-end justify-between gap-2 mt-1">
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatValue(value)}</p>
      </div>
    </div>
  );
};

const TotalSpendReport = ({ graphData, cardData }) => {
  const chartData = graphData.map((item) => ({
    date: format(parseISO(item.date), "dd MMM"),
    spend: item.totalSpend,
  }));

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-gray-800">Total Spend</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
            A summary of your spending and performance.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Graph Section */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="h-[280px] sm:h-[320px] lg:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FDBA74" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FDBA74" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  className="text-[10px] sm:text-xs"
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  width={40}
                  className="text-[10px] sm:text-xs"
                />
                <Tooltip
                  content={<SpendTooltip />}
                  cursor={{
                    stroke: "#F97316",
                    strokeWidth: 1.5,
                    strokeDasharray: "5 5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#F97316"
                  strokeWidth={2}
                  fill="url(#spendGradient)"
                  activeDot={{
                    r: 5,
                    stroke: "white",
                    strokeWidth: 2,
                    fill: "#F97316",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2 sm:gap-3 lg:gap-2">
            <StatCard title="Today's Spends" value={cardData?.spends} />
            <StatCard title="Clicks" value={cardData?.clicks} />
            <StatCard title="Conversions" value={cardData?.conversions} />
            <StatCard title="Total Spend" value={cardData?.totalSpend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSpendReport;