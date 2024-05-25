import React, { useContext, useState, useEffect } from "react";
import Context from "../context";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

// const data = [
//   { name: "Entertainment", value: 80 },
//   { name: "Food", value: 50 },
//   { name: "Travel", value: 20 },
// ];

const BarChartComponent = () => {
  const { percentage, setPercentage } = useContext(Context);
  const [data, setdata] = useState([
    { name: "Food", value: 30 },
    { name: "Entertainment", value: 70 },
    { name: "Travel", value: 10 },
  ]);

useEffect(() => {
  setdata(percentage);
}, [percentage])

  return (
    <BarChart
      //   style={{ padding: "30px" }}
      width={400}
      height={350}
      data={data}
      margin={{
        top: 20,
        right: 10,
        left: 30,
        bottom: 5,
      }}
      layout="vertical"
      barCategoryGap="10%" // Adjusts the gap between categories
    >
      <XAxis type="number" tick={false} axisLine={false} />
      <YAxis
        dataKey="name"
        type="category"
        axisLine={false}
        tickLine={false}
        fontSize={12}
      />
      <Bar
        dataKey="value"
        fill="#8a79f7"
        barSize={20} // Controls the thickness of the bars
        radius={[0, 10, 10, 0]}
      />
    </BarChart>
  );
};

export default BarChartComponent;
