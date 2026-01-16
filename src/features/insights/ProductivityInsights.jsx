import { useState, useEffect } from "react";

function ProductivityInsights() {
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [focusTimes, setFocusTimes] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const completedCounts = last7Days.map((date) => {
      return tasks.filter(
        (task) =>
          task.completed &&
          task.completedAt &&
          task.completedAt.startsWith(date)
      ).length;
    });

    const focusCounts = last7Days.map((date) => {
      return parseFloat(localStorage.getItem(`focus-${date}`) || "0");
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasksCompleted(completedCounts);
    setFocusTimes(focusCounts);

    // Calculate streak: consecutive days with at least one task completed
    let currentStreak = 0;
    for (let i = last7Days.length - 1; i >= 0; i--) {
      if (completedCounts[i] > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  }, []);

  const maxTasks = Math.max(...tasksCompleted, 1);
  const maxFocus = Math.max(...focusTimes, 1);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Tasks Completed (Last 7 Days)
        </h3>
        <svg
          width="300"
          height="150"
          className="border">
          {tasksCompleted.map((count, i) => (
            <rect
              key={i}
              x={i * 40 + 10}
              y={120 - (count / maxTasks) * 100}
              width="30"
              height={(count / maxTasks) * 100}
              fill="#3b82f6"
            />
          ))}
          {tasksCompleted.map((count, i) => (
            <text
              key={`text-${i}`}
              x={i * 40 + 25}
              y={135}
              textAnchor="middle"
              fontSize="10">
              {count}
            </text>
          ))}
        </svg>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Focus Time (Last 7 Days, minutes)
        </h3>
        <svg
          width="300"
          height="150"
          className="border">
          {focusTimes.map((time, i) => (
            <rect
              key={i}
              x={i * 40 + 10}
              y={120 - (time / maxFocus) * 100}
              width="30"
              height={(time / maxFocus) * 100}
              fill="#10b981"
            />
          ))}
          {focusTimes.map((time, i) => (
            <text
              key={`text-${i}`}
              x={i * 40 + 25}
              y={135}
              textAnchor="middle"
              fontSize="10">
              {time.toFixed(1)}
            </text>
          ))}
        </svg>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Current Streak</h3>
        <p className="text-2xl">{streak} days</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Weekly Summary</h3>
        <p>
          Total tasks completed: {tasksCompleted.reduce((a, b) => a + b, 0)}
        </p>
        <p>
          Total focus time: {focusTimes.reduce((a, b) => a + b, 0).toFixed(1)}{" "}
          minutes
        </p>
      </div>
    </div>
  );
}

export default ProductivityInsights;
