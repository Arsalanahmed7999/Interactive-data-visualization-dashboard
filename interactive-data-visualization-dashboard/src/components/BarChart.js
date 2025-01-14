import React, { useContext, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { ChartContext } from "../networks/ContextApi";
import { LineChart } from "./LineChart";

export const BarChart = ({ dateRange, gender, age }) => {
  const { graphData } = useContext(ChartContext);
  const [selectedBarData, setSelectedBarData] = useState(null);

  const filterData = (data, startDate, endDate, genderFilter, ageFilter) => {
    return data.filter((item) => {
      const itemDate = new Date(item.Day);
      const isWithinDateRange =
        (!startDate || !endDate || (itemDate >= new Date(startDate) && itemDate <= new Date(endDate)));
      const isGenderMatch = !genderFilter || item.Gender === genderFilter;
      const isAgeMatch = !ageFilter || item.Age === ageFilter;
      return isWithinDateRange && isGenderMatch && isAgeMatch;
    });
  };

  const filteredData = useMemo(() => {
    return filterData(
      graphData,
      dateRange.startDate,
      dateRange.endDate,
      gender,
      age
    );
  }, [graphData, dateRange, gender, age]);

  const aggregatedData = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.A += parseInt(item.A, 10);
        acc.B += parseInt(item.B, 10);
        acc.C += parseInt(item.C, 10);
        acc.D += parseInt(item.D, 10);
        acc.E += parseInt(item.E, 10);
        acc.F += parseInt(item.F, 10);
        return acc;
      },
      { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
    );
  }, [filteredData]);

  const categories = ["F", "E", "D", "C", "B", "A"];
  const data = [
    aggregatedData.F,
    aggregatedData.E,
    aggregatedData.D,
    aggregatedData.C,
    aggregatedData.B,
    aggregatedData.A,
  ];

  const handleBarClick = (event, chartContext, config) => {
    const clickedCategory = categories[config.dataPointIndex];
    const clickedValue = data[config.dataPointIndex];
    setSelectedBarData({ category: clickedCategory, value: clickedValue })
  };



  return (
    <div className="card mb-3">
      {filteredData.length === 0 ? (
        <div className="card-body ">
          <p className="no-data-message">No data available for the selected filters.</p>
        </div>
      ) : (
        <div className="card-body">
          <Chart
            type="bar"
            series={[
              {
                name: "Total Time Spent",
                data: data,
              },
            ]}
            options={{
              chart: {
                type: "bar",
                toolbar: {
                  show: true,
                },
                events: {
                  dataPointSelection: handleBarClick, 
                },
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  barHeight: '100px'
                },
              },
              dataLabels: {
                enabled: true,
                style: {
                  colors: ["#fff"],
                },
              },
              xaxis: {
                categories: categories,
                title: {
                  text: "Total Time Spent",
                  fontSize: "16px",
                },
                labels: {
                  style: {
                    fontSize: "14px",
                    fontWeight: 600,
                  },
                },
              },
              yaxis: {
                title: {
                  text: "Features",
                },
              },
              colors: ["#007bff"],
            }}
          />
        </div>    
      )}
    </div>
  );
};
