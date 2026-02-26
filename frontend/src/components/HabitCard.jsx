// import { useState } from "react";

// function HabitCard({habit, onDelete, onComplete,}) {
//   const [completed, setCompleted] = useState(false);

//   const handleComplete = () => {
//     if (completed) return;
//     onComplete(habit._id);
//     setCompleted(true);
//   };

//   return (
//     <div className="border rounded-lg p-6 shadow-md flex flex-col space-y-3 bg-gray-800 text-white hover:shadow-xl transition duration-200">
//       <h3 className="font-bold text-xl">{habit.title}</h3>

//       <p className="text-gray-300">{habit.description}</p>

//       <div className="flex space-x-3">
//         <button
//           className={`px-3 py-1 rounded text-white ${
//             completed ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           } transition`}
//           onClick={handleComplete}
//           disabled={completed}
//         >
//           {completed ? "Completed" : "Complete"}
//         </button>

//         <button
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//           onClick={() =>
//             onDelete(habit._id)
//           }
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HabitCard;


function HabitCard({habit, onDelete, onComplete, onEdit, onHistory,}) {

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300">


      {/* TITLE */}
      <h3 className="text-xl font-bold text-white mb-1">
        {habit.title}
      </h3>



      {/* DESCRIPTION */}
      {habit.description && (
        <p className="text-gray-400 mb-2">
          {habit.description}
        </p>
      )}



      {/* CREATION DATE */}
      <p className="text-gray-500 text-sm mb-3">
        Created:{" "}
        {new Date(
          habit.createdAt
        ).toLocaleDateString()}
      </p>



      {/* BUTTONS */}
      <div className="flex flex-wrap gap-2">


        {/* COMPLETE */}
        <button
          onClick={() =>
            onComplete(habit._id)
          }
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
        >
          Complete
        </button>



        {/* EDIT */}
        <button
          onClick={() =>
            onEdit(habit)
          }
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
        >
          Edit
        </button>



        {/* HISTORY */}
        <button
          onClick={() =>
            onHistory(habit._id)
          }
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
        >
          History
        </button>



        {/* DELETE */}
        <button
          onClick={() =>
            onDelete(habit._id)
          }
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default HabitCard;