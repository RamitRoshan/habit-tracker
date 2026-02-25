import { useState } from "react";

function HabitCard({habit, onDelete, onComplete,}) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (completed) return;
    onComplete(habit._id);
    setCompleted(true);
  };

  return (
    <div className="border rounded-lg p-6 shadow-md flex flex-col space-y-3 bg-gray-800 text-white hover:shadow-xl transition duration-200">
      <h3 className="font-bold text-xl">{habit.title}</h3>

      <p className="text-gray-300">{habit.description}</p>

      <div className="flex space-x-3">
        <button
          className={`px-3 py-1 rounded text-white ${
            completed ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
          onClick={handleComplete}
          disabled={completed}
        >
          {completed ? "Completed" : "Complete"}
        </button>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={() =>
            onDelete(habit._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default HabitCard;