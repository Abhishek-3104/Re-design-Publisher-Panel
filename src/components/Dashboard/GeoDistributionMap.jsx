// GeoDistributionMap.jsx - Simple Version
import React, { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FiMapPin } from "react-icons/fi";

const geoUrl = "/world-110m.json";

const GeoDistributionMap = ({ geoData }) => {
  const dataMap = useMemo(() => {
    if (!geoData) return {};
    const map = {};
    geoData.forEach((item) => {
      map[item.country_code] = parseInt(item.activeUsers, 10);
    });
    return map;
  }, [geoData]);

  const totalUsers = useMemo(() => {
    return Object.values(dataMap).reduce((sum, val) => sum + val, 0);
  }, [dataMap]);

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center">
            <FiMapPin size={20} className="text-orange-500 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-800">
              Active Users by Country
            </h3>
            {totalUsers > 0 && (
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {totalUsers.toLocaleString()} total users across{" "}
                {Object.keys(dataMap).length} countries
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex-grow rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
        <ReactTooltip
          id="geo-tooltip"
          style={{
            backgroundColor: "#111827",
            borderRadius: "0.5rem",
            fontSize: "0.75rem",
            zIndex: 1000,
          }}
        />
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={[0, 20]} zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.ISO_A2;
                  const countryName = geo.properties.NAME;
                  const userCount = dataMap[countryCode];
                  const hasData = userCount !== undefined && userCount > 0;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="geo-tooltip"
                      data-tooltip-content={
                        hasData
                          ? `${countryName}: ${userCount.toLocaleString()} users`
                          : null
                      }
                      style={{
                        default: {
                          fill: hasData ? "#F97316" : "#E5E7EB",
                          outline: "none",
                          transition: "all 0.3s ease",
                        },
                        hover: {
                          fill: hasData ? "#EA580C" : "#D1D5DB",
                          outline: "none",
                          cursor: hasData ? "pointer" : "default",
                        },
                        pressed: {
                          fill: "#C2410C",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default GeoDistributionMap;