import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "../components/BarChart";
import { LineChart } from "../components/LineChart";
import { ChartContext } from "../networks/ContextApi";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

export const Dashboard = () => {
  const { graphData } = useContext(ChartContext);

  const [dateRange, setDateRange] = useState({});
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");


  const handleDateChange = (event, picker) => {
    setDateRange({
      startDate: picker.startDate.toISOString().split("T")[0], 
      endDate: picker.endDate.toISOString().split("T")[0], 
    });
  };

  const handleGenderChange = (gender) => {
    setGender(gender);
  }

  const handleAgeChange = (age) => {
    setAge(age);
  }

  if (!graphData || graphData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="row mx-0 mt-3">
      <div className="col-xxl-12 col-xl-12 col-md-12 mb-3">
        <div className="row">
          <div className="col-xxl-2 col-xl-2 col-md-2">
            <DateRangePicker
              initialSettings={{
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                locale: {
                  format: "DD/MM/YYYY",
                },
              }}
              onApply={handleDateChange}
            >
              <input type="text" className="form-control" />
            </DateRangePicker>
          </div>
          <div className="col-xxl-auto col-xl-auto col-md-auto">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {age == "" ? "Age" : age}
                </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleAgeChange("15-25")}>
                    15-25
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleAgeChange(">25")}>
                    {">25"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xxl-auto col-xl-auto col-md-auto">
            <div className="dropdown">
              <button
                className="btn btn-light  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {gender == "" ? "Gender" : gender}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleGenderChange("Male")}>
                    Male
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleGenderChange("Female")}>
                    Female
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-12 col-xl-12 col-md-12">
        <BarChart dateRange={dateRange} gender={gender} age={age} />
      </div>
      {/* <div className="col-xxl-6 col-xl-6 col-md-6">
        <LineChart dateRange={dateRange} gender={gender} age={age} />
      </div> */}
    </div>
  );
};
