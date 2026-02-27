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


const deleteHabit = async (id) => {

    try {

      await API.delete(`/habits/${id}`);

      fetchHabits();

      showMessage("Habit deleted");

    } catch {

      showMessage("Error deleting habit", true);

    }

  };

 
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


const editHabit = (habit) => {

    setEditingId(habit._id);
    setTitle(habit.title);
    setDescription(habit.description || "");

  };

 
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



      {/* message */}
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



      {/* Form */}
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
          placeholder="Description"
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



      {/* Habites list*/}
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



      {/* History section */}
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