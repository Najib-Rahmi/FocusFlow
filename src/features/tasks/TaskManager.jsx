import { useState, useEffect, useTransition } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [, startTransition] = useTransition();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      startTransition(() => {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            text: newTask,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ]);
        setNewTask("");
        setDueDate("");
      });
    }
  };

  const toggleComplete = (id) => {
    startTransition(() => {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : null,
              }
            : task
        )
      );
    });
  };

  const deleteTask = (id) => {
    startTransition(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-2 rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 rounded"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center gap-2 p-2 rounded ${
              task.completed ? "opacity-50 line-through" : ""
            }`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className="flex-1">{task.text}</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}>
              {task.priority}
            </span>
            {task.dueDate && <span>{task.dueDate}</span>}
            <button
              onClick={() => deleteTask(task.id)}
              className="px-2 py-1 bg-red-500 rounded hover:bg-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
