import "./App.css";
import { useState, useEffect } from "react";
import TaskManager from "./features/tasks/TaskManager";
import FocusTimer from "./features/focus/FocusTimer";
import DailyReflection from "./features/insights/DailyReflection";
import ProductivityInsights from "./features/insights/ProductivityInsights";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "" ? "text-black" : "text-white"
      }`}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">FocusFlow</h1>
        <p className="text-lg opacity-80">Smart Productivity Dashboard</p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setTheme("")}
            className={`px-4 py-2 rounded ${
              theme === "" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"
            }`}>
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white"
            }`}>
            Dark
          </button>
          <button
            onClick={() => setTheme("focus")}
            className={`px-4 py-2 rounded ${
              theme === "focus"
                ? "bg-red-500 text-white"
                : "bg-black text-white"
            }`}>
            Focus
          </button>
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <section
          className={`rounded-lg p-6 ${
            theme === ""
              ? "bg-white shadow-lg border border-gray-200"
              : theme === "dark"
              ? "bg-white/10 backdrop-blur-sm"
              : "bg-gray-800"
          }`}>
          <h2 className="text-2xl font-semibold mb-4">Task Manager</h2>
          <TaskManager />
        </section>
        <section
          className={`rounded-lg p-6 ${
            theme === ""
              ? "bg-white shadow-lg border border-gray-200"
              : theme === "dark"
              ? "bg-white/10 backdrop-blur-sm"
              : "bg-gray-800"
          }`}>
          <h2 className="text-2xl font-semibold mb-4">Focus Timer</h2>
          <FocusTimer />
        </section>
        <section
          className={`rounded-lg p-6 ${
            theme === ""
              ? "bg-white shadow-lg border border-gray-200"
              : theme === "dark"
              ? "bg-white/10 backdrop-blur-sm"
              : "bg-gray-800"
          }`}>
          <h2 className="text-2xl font-semibold mb-4">Daily Reflection</h2>
          <DailyReflection />
        </section>
        <section
          className={`rounded-lg p-6 ${
            theme === ""
              ? "bg-white shadow-lg border border-gray-200"
              : theme === "dark"
              ? "bg-white/10 backdrop-blur-sm"
              : "bg-gray-800"
          }`}>
          <h2 className="text-2xl font-semibold mb-4">Productivity Insights</h2>
          <ProductivityInsights />
        </section>
      </main>
    </div>
  );
}

export default App;
