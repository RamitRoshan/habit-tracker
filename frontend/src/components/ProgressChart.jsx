import React from "react";
import {LineChart,Line,XAxis,YAxis,Tooltip,} from "recharts";

function ProgressChart({ data }) {
  return (
    <LineChart
      width={400}
      height={200}
      data={data}
    >
      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="count"
        stroke="#8884d8"
      />
    </LineChart>
  );
}

export default ProgressChart;