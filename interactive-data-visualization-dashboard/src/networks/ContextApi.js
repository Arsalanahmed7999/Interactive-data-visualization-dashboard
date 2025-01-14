import React, { createContext, useEffect, useState } from "react";

// Create Context
export const ChartContext = createContext();

// Context Provider Component
const ChartProvider = ({ children }) => {

  const [graphData, getGraphData] = useState([]);
    const fetchData = async ()=>{
      try {
        const response = await fetch("http://localhost:5000/api/data");
        const data = await response.json();
        getGraphData(data);
      } catch (error) {
        console.log("error: ", error);  
      }
    }
  
    useEffect(()=>{
      fetchData();
    }, []);
  

  return (
    <ChartContext.Provider
      value={{
        graphData,
        getGraphData,
        fetchData
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartProvider;
