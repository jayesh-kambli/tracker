import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import Context from "../context";



const COLORS = ["#AA00FF", "#FFBB28", "#FFDC00"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={20}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart = () => {
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
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={130}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={130}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke="none"
          />
        ))}
      </Pie>
      <Legend
        iconSize={10}
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
      {/* <Tooltip /> */}
    </PieChart>
  );
};

export default CustomPieChart;
