// GeoTargetingChart.jsx - No changes needed, already receives props
import React, { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";

const geoUrl = "/world-110m.json";

const GeoTargetingChart = ({ countryData }) => {
  const dataMap = useMemo(() => {
    if (!countryData) return {};
    const map = {};
    countryData.forEach((item) => {
      map[item.country_code] = parseInt(item.totalConversions, 10);
    });
    return map;
  }, [countryData]);

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md h-full flex flex-col">
      <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">
          Conversions by Country
      </h3>
      <div className="relative w-full h-full min-h-[300px] flex-grow">
        <ReactTooltip 
          id="country-tooltip" 
          style={{ 
            backgroundColor: "#111827", 
            borderRadius: '0.5rem', 
            fontSize: '0.75rem' 
          }} 
        />
        <ComposableMap
          projection="geoMercator"
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={[0, 20]} zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.ISO_A2;
                  const countryName = geo.properties.NAME;
                  const conversionCount = dataMap[countryCode];
                  const hasData = conversionCount !== undefined;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="country-tooltip"
                      data-tooltip-content={
                        hasData
                          ? `${countryName}: ${conversionCount.toLocaleString()}`
                          : null
                      }
                      style={{
                        default: {
                          fill: hasData ? "#4338CA" : "#E5E7EB",
                          outline: "none",
                        },
                        hover: {
                          fill: hasData ? "#4F46E5" : "#D1D5DB",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#3730A3",
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

export default GeoTargetingChart;