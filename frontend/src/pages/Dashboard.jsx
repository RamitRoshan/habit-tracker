// import React from "react";
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import ProgressChart from "../components/ProgressChart";

// function Dashboard() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       const res = await API.get("/logs");

//       setLogs(res.data);
//     };

//     fetchLogs();
//   }, []);

//   const chartData = logs.map((log) => ({
//     date: log.date,
//     count: 1,
//   }));

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

//       <div className="max-w-lg mx-auto">
//         <ProgressChart data={chartData} />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from "react";
import API from "../api/axios"; 

export default function Dashboard() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      return; // STOP if not logged in
    }

    fetchLogs();

  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/logs");
      setLogs(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {!localStorage.getItem("token") ? (
        <p>Please login to view dashboard</p>
      ) : (
        logs.map(log => (
          <div key={log._id}>
            {log.date} - {log.status}
          </div>
        ))
      )}

    </div>
  );
}