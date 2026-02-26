// import React from "react";
// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import HabitCard from "../components/HabitCard";

// function Habits() {
//   const [habits, setHabits] = useState([]);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const fetchHabits = async () => {
//     try{
//         const res = await API.get("/habits");
//         setHabits(res.data);

//     }catch(err){
//         console.log(err);
//     }
//   };
  
//   useEffect(() => {
//     fetchHabits();
//   }, []);

//   const createHabit = async () => {
//     if (!title.trim() || !description.trim()) {
//       setMessage("Please fill out both fields.");
//       setIsError(true);
//       setTimeout(() => {
//         setMessage("");
//         setIsError(false);
//       }, 3000);
//       return;
//     }

//     await API.post("/habits", {title, description});
//     fetchHabits();
//     setTitle("");
//     setDescription("");
//     setMessage("Habit added!");
//     setIsError(false);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const deleteHabit = async (id) => {
//     await API.delete(`/habits/${id}`);

//     fetchHabits();
//     setMessage("Habit deleted.");
//     setIsError(false);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const markComplete = async (id) => {
//     await API.post("/logs", {
//       habitId: id,
//     });

//     setMessage("Habit marked complete!");
//     setIsError(false);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   return (
//     <div className="p-6 flex flex-col items-center">
//       <h2 className="text-xl font-semibold mb-4 text-center">Habits</h2>

//       {message && (
//         <div
//           className={`mb-4 font-medium ${isError ? "text-red-600" : "text-green-600"}`}
//         >
//           {message}
//         </div>
//       )}

//       <div className="mb-6 space-y-2 w-full max-w-md">
//         <input
//           className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) =>
//             setTitle(e.target.value)
//           }
//         />

//         <input
//           className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) =>
//             setDescription(e.target.value)
//           }
//         />

//         <button
//           onClick={createHabit}
//           className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
//         >
//           Add Habit
//         </button>
//       </div>

//       <div className="space-y-4 w-full max-w-md">
//         {habits.map((habit) => (
//           <HabitCard
//             key={habit._id}
//             habit={habit}
//             onDelete={deleteHabit}
//             onComplete={markComplete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Habits;




import { useState, useEffect } from "react";
import API from "../api/axios";
import HabitCard from "../components/HabitCard";

function Habits() {

  const [habits, setHabits] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [history, setHistory] = useState([]);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);



  // FETCH HABITS
  const fetchHabits = async () => {
    try {

      const res = await API.get("/habits");

      setHabits(res.data);

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHabits();
  }, []);




  // CREATE OR UPDATE HABIT
  const handleSubmit = async () => {

    if (!title.trim()) {

      showMessage("Title is required", true);
      return;

    }

    try {

      if (editingId) {

        await API.put(`/habits/${editingId}`, {
          title,
          description,
        });

        showMessage("Habit updated successfully");

        setEditingId(null);

      } else {

        await API.post("/habits", {
          title,
          description,
        });

        showMessage("Habit created successfully");

      }

      setTitle("");
      setDescription("");

      fetchHabits();

    } catch (err) {

      showMessage(err.response?.data?.message || "Error", true);

    }

  };



  // DELETE HABIT
  const deleteHabit = async (id) => {

    try {

      await API.delete(`/habits/${id}`);

      fetchHabits();

      showMessage("Habit deleted");

    } catch {

      showMessage("Error deleting habit", true);

    }

  };



  // MARK COMPLETE
  const markComplete = async (id) => {

    try {

      await API.post("/logs", {
        habitId: id,
      });

      showMessage("Habit marked complete");

    } catch (err) {

      showMessage(
        err.response?.data?.message,
        true
      );

    }

  };



  // EDIT HABIT
  const editHabit = (habit) => {

    setEditingId(habit._id);

    setTitle(habit.title);

    setDescription(habit.description || "");

  };



  // VIEW HISTORY
  const viewHistory = async (habitId) => {

    try {

      const res = await API.get(`/logs/${habitId}`);

      setHistory(res.data);

    } catch {

      showMessage("Error loading history", true);

    }

  };



  const showMessage = (msg, error = false) => {

    setMessage(msg);

    setIsError(error);

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };



  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">


      <h1 className="text-3xl font-bold mb-6">
        Habit Tracker
      </h1>



      {/* MESSAGE */}
      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            isError
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {message}
        </div>
      )}



      {/* FORM */}
      <div className="bg-gray-800 p-4 rounded w-full max-w-md mb-6">

        <input
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
          placeholder="Habit Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />


        <input
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />


        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          {editingId
            ? "Update Habit"
            : "Create Habit"}
        </button>

      </div>



      {/* HABIT LIST */}
      <div className="w-full max-w-md space-y-4">

        {habits.map((habit) => (

          <HabitCard
            key={habit._id}
            habit={habit}
            onDelete={deleteHabit}
            onComplete={markComplete}
            onEdit={editHabit}
            onHistory={viewHistory}
          />

        ))}

      </div>



      {/* HISTORY SECTION */}
      {history.length > 0 && (

        <div className="mt-8 bg-gray-800 p-4 rounded w-full max-w-md">

          <h2 className="font-bold mb-3">
            Completion History
          </h2>

          {history.map((log) => (

            <div key={log._id}>
              {log.date}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Habits;