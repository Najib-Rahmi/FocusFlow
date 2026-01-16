import { useState, useEffect, useRef } from "react";

function FocusTimer() {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [ambientMode, setAmbientMode] = useState(false);
  const intervalRef = useRef(null);
  const sessionStartRef = useRef(null);

  useEffect(() => {
    if (isRunning && isFocus && !sessionStartRef.current) {
      sessionStartRef.current = Date.now();
    }
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Switch modes
            if (isFocus) {
              // Record focus session
              if (sessionStartRef.current) {
                const duration =
                  (Date.now() - sessionStartRef.current) / 1000 / 60; // minutes
                const today = new Date().toISOString().split("T")[0];
                const saved = localStorage.getItem(`focus-${today}`) || "0";
                const total = parseFloat(saved) + duration;
                localStorage.setItem(`focus-${today}`, total.toString());
                sessionStartRef.current = null;
              }
              setIsFocus(false);
              setTimeLeft(breakTime * 60);
              if (Notification.permission === "granted") {
                new Notification("Break time!");
              }
            } else {
              setIsFocus(true);
              setTimeLeft(focusTime * 60);
              if (Notification.permission === "granted") {
                new Notification("Focus time!");
              }
            }
            setIsRunning(false);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isFocus, focusTime, breakTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isFocus ? focusTime * 60 : breakTime * 60);
  };

  const requestNotificationPermission = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    ((isFocus ? focusTime * 60 : breakTime * 60) - timeLeft) /
    (isFocus ? focusTime * 60 : breakTime * 60);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className={`${ambientMode ? "opacity-50" : ""}`}>
      <div className="mb-4 flex gap-2">
        <label>
          Focus (min):
          <input
            type="number"
            value={focusTime}
            onChange={(e) => setFocusTime(Number(e.target.value))}
            className="ml-2 p-1 rounded w-16"
            disabled={isRunning}
          />
        </label>
        <label>
          Break (min):
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
            className="ml-2 p-1 rounded w-16"
            disabled={isRunning}
          />
        </label>
      </div>
      <div className="flex flex-col items-center">
        <svg
          width="120"
          height="120"
          className="mb-4">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>
        <div className="text-lg mb-4">{isFocus ? "Focus" : "Break"}</div>
        <div className="flex gap-2">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600">
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
            Reset
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setAmbientMode(!ambientMode)}
            className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600">
            {ambientMode ? "Exit Ambient" : "Ambient Mode"}
          </button>
          <button
            onClick={requestNotificationPermission}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
            Enable Notifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
