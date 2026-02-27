function HabitCard({habit, onDelete, onComplete, onEdit, onHistory,}) {

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300">


      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-1">
        {habit.title}
      </h3>



      {/* Description */}
      {habit.description && (
        <p className="text-gray-400 mb-2">
          {habit.description}
        </p>
      )}



      {/* Creation Date */}
      <p className="text-gray-500 text-sm mb-3">
        Created:{" "}
        {new Date(
          habit.createdAt
        ).toLocaleDateString()}
      </p>



      {/* Buttons */}
      <div className="flex flex-wrap gap-2">

        <button
          onClick={() =>
            onComplete(habit._id)
          }
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
        >
          Complete
        </button>

        <button
          onClick={() =>
            onEdit(habit)
          }
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onHistory(habit._id)
          }
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
        >
          History
        </button>

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