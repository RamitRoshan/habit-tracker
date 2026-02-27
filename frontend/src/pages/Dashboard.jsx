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

  const [completionRate, setCompletionRate] =
    useState(0);



  useEffect(() => {

    if (!localStorage.getItem("token")) {
      return;
    }

    // eslint-disable-next-line react-hooks/immutability
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

  //calculating streak and completion 
  const calculateStats = (logsData) => {

    const dates = logsData.map(
      (log) => log.date
    );

    const uniqueDates = [
      ...new Set(dates),
    ].sort().reverse();



    //calculating streak
    let currentStreak = 0;

    let today = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {

      const d = new Date(uniqueDates[i]);

      const diff = Math.floor(
          (today - d) /
            (1000 * 60 * 60 * 24)
        );

      if (diff === currentStreak) {
        currentStreak++;
      } else {
        break;
      }

    }

    setStreak(currentStreak);

    // Completion rates
    const totalDays = 30;

    const completion =(uniqueDates.length /totalDays) *100;
    setCompletionRate(
      completion.toFixed(1)
    );

  };



  //chart data
  const chartData = logs.map((log) => ({
    date: log.date,
    count: 1,
  }));



  if (!localStorage.getItem("token")) {

    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please login to view dashboard
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">


      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">


        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-gray-400">
            Current Streak
          </h2>

          <p className="text-2xl font-bold text-green-400">
            {streak} days
          </p>
        </div>



        <div className="bg-gray-800 p-4 rounded">

          <h2 className="text-gray-400">
            Completion Rate
          </h2>

          <p className="text-2xl font-bold text-blue-400">
            {completionRate}%
          </p>

        </div>


      </div>



      {/* Charts */}
      <div className="bg-gray-800 p-4 rounded">


        <h2 className="mb-4 font-semibold">
          Progress Chart
        </h2>


        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={chartData}>

            <CartesianGrid stroke="#444" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#22c55e"
            />

          </LineChart>
        </ResponsiveContainer>


      </div>


    </div>
  );

}