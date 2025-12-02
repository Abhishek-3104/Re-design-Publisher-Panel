// ConversionClicksChart.jsx - No changes needed, already receives props
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

const ConversionClicksChart = ({ graphData }) => {
  const chartData = graphData.map(item => ({
    name: format(parseISO(item.date), 'dd MMM'),
    clicks: item.clicks,
    conversions: item.conversions,
  }));

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6 focus:border-0">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800">Conversion Clicks</h3>
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full flex-shrink-0"></span>
            <span>Clicks</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-indigo-800 rounded-full flex-shrink-0"></span>
            <span>Conversions</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[250px] sm:h-[280px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              className="text-[10px] sm:text-xs"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              width={35}
              className="text-[10px] sm:text-xs"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
              }}
              labelStyle={{ color: "#F9FAFB", fontSize: "0.75rem" }}
              formatter={(value, name) => [value.toLocaleString(), name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stackId="1"
              stroke="#4338CA" 
              strokeWidth={2}
              fill="#4338CA"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stackId="1"
              stroke="#F97316"
              strokeWidth={2}
              fill="#F97316"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionClicksChart;