// RevenueGraph.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { format, parseISO } from "date-fns";
import { FiDollarSign } from "react-icons/fi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 sm:p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
          {label}
        </p>
        <p className="text-xs sm:text-sm font-bold text-gray-800">
          ${payload[0].value}k
        </p>
      </div>
    );
  }
  return null;
};

const RevenueGraph = ({ totalRevenue, revenueGraph }) => {
  const chartData =
    revenueGraph?.length > 0
      ? revenueGraph.map((item) => {
          const date = parseISO(`${item.month}-01`);
          const formattedMonth = format(date, "MMM ''yy");

          return {
            name: formattedMonth,
            value: parseFloat(item.totalRevenue) || 0,
          };
        })
      : [];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md h-full flex flex-col">
      <div className="flex flex-col space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3 sm:mb-4">
              <FiDollarSign
                size={20}
                className="text-orange-500 sm:w-6 sm:h-6"
              />
            </div>

            <h3 className="text-gray-500 text-sm sm:text-base font-medium mb-1 sm:mb-2">
              Total Revenue (Last 6 Months)
            </h3>
            <div className="text-gray-800 text-2xl sm:text-4xl font-bold">
              ${totalRevenue}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full rounded-xl border border-gray-100 bg-gray-50 overflow-hidden p-2">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ left: 0, right: 10, top: 10, bottom: 5 }}
              >
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#78716c" }}
                  dy={5}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#78716c" }}
                  tickFormatter={(value) => `$${value}k`}
                  domain={[0, "auto"]}
                  width={35}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar
                  dataKey="value"
                  fill="#F97316"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">No revenue data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueGraph;