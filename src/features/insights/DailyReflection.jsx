import { useState, useEffect } from "react";

function DailyReflection() {
  const [accomplishments, setAccomplishments] = useState("");
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = localStorage.getItem(`reflection-${today}`);
    if (saved) {
      const data = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccomplishments(data.accomplishments || "");
      setMood(data.mood || "");
      setNotes(data.notes || "");
    }
  }, [today]);

  const saveReflection = () => {
    const data = { accomplishments, mood, notes };
    localStorage.setItem(`reflection-${today}`, JSON.stringify(data));
    alert("Reflection saved!");
  };

  const moods = ["😊", "😐", "😢", "😡", "😴"];

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2">What did I accomplish today?</label>
        <textarea
          value={accomplishments}
          onChange={(e) => setAccomplishments(e.target.value)}
          className="w-full p-2 rounded"
          rows="3"
          placeholder="List your accomplishments..."
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Mood</label>
        <div className="flex gap-2">
          {moods.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setMood(emoji)}
              className={`text-2xl p-2 rounded ${
                mood === emoji ? "bg-blue-500" : "bg-gray-200"
              }`}>
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 rounded"
          rows="3"
          placeholder="Additional notes..."
        />
      </div>
      <button
        onClick={saveReflection}
        className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
        Save Reflection
      </button>
    </div>
  );
}

export default DailyReflection;
