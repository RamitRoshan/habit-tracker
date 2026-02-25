import React from "react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import HabitCard from "../components/HabitCard";

function Habits() {
  const [habits, setHabits] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchHabits = async () => {
    try{
        const res = await API.get("/habits");
        setHabits(res.data);

    }catch(err){
        console.log(err);
    }
  };
  
  useEffect(() => {
    fetchHabits();
  }, []);

  const createHabit = async () => {
    if (!title.trim() || !description.trim()) {
      setMessage("Please fill out both fields.");
      setIsError(true);
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 3000);
      return;
    }

    await API.post("/habits", {title, description});
    fetchHabits();
    setTitle("");
    setDescription("");
    setMessage("Habit added!");
    setIsError(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteHabit = async (id) => {
    await API.delete(`/habits/${id}`);

    fetchHabits();
    setMessage("Habit deleted.");
    setIsError(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const markComplete = async (id) => {
    await API.post("/logs", {
      habitId: id,
    });

    setMessage("Habit marked complete!");
    setIsError(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">Habits</h2>

      {message && (
        <div
          className={`mb-4 font-medium ${isError ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </div>
      )}

      <div className="mb-6 space-y-2 w-full max-w-md">
        <input
          className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          className="w-full border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createHabit}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Add Habit
        </button>
      </div>

      <div className="space-y-4 w-full max-w-md">
        {habits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onDelete={deleteHabit}
            onComplete={markComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default Habits;