import React from "react";
import Chart from "react-apexcharts";

export const LineChart = ({ dateRange, gender, age }) => {
  return (
    <div className="card">
      <div className="card-body">
      <Chart
      type="line"
      series={[
        {
          name: "Sales", 
          data: [
            { x: "2024-08-28", y: 6 },
            { x: "2024-08-29", y: 15 },
            { x: "2024-08-31", y: 7 },
            { x: "2024-09-01", y: 18 },
            { x: "2024-09-02", y: 4 },
          ],
        },
      ]}
      options={{  
        xaxis: {
          type: "datetime",
          tickAmount: 6,
        },
        grid: {
          show: true,
        },
        dataLabels: {
          enabled: true,
        },
      }}
    />
      </div>
    </div>
  );
};
