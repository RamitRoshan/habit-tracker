import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [logs, setLogs] = useState([]);
  const [streak, setStreak] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      return;
    }
    fetchLogs();

  }, []);


  const fetchLogs = async () => {

    try {

      const res = await API.get("/logs");

      const logsData = res.data;

      setLogs(logsData);

      calculateStats(logsData);

    } catch (error) {

      console.log(error);

    }

  };

  const calculateStats = (logsData) => {

    const dates = logsData.map((log) => log.date);

    const uniqueDates = [...new Set(dates)].sort().reverse();

    // streak calculation
    let currentStreak = 0;

    let today = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {

      const d = new Date(uniqueDates[i]);

      const diff = Math.floor(
        (today - d) / (1000 * 60 * 60 * 24)
      );

      if (diff === currentStreak) {
        currentStreak++;
      } else {
        break;
      }

    }
    setStreak(currentStreak);

    // completion rate
    const totalDays = 30;

    const completion =
      (uniqueDates.length / totalDays) * 100;

    setCompletionRate(
      completion.toFixed(1)
    );

  };



  // chart data
const chartData = logs.map((log) => ({
    date: log.date,
    count: 1,
}));

if (!localStorage.getItem("token")) {

    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900 px-4 text-center">
        Please login to view dashboard
      </div>
    );

}

return (

    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-6">


      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">


        {/* Streak */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">

          <h2 className="text-gray-400 text-sm sm:text-base">
            Current Streak
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-green-400">
            {streak} days
          </p>

        </div>



        {/* Completion Rate */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">

          <h2 className="text-gray-400 text-sm sm:text-base">
            Completion Rate
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-blue-400">
            {completionRate}%
          </p>
        </div>
      </div>



      {/* Chart */}
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">

        <h2 className="mb-4 font-semibold text-base sm:text-lg">
          Progress Chart
        </h2>

        <div className="w-full h-[250px] sm:h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={chartData}>

              <CartesianGrid stroke="#444" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
);

}