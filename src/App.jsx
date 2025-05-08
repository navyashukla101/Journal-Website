import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PromptSection from "./components/PromptSection";

const categories = {
  "💪 Self-Based Prompts": [
    "One thing I bring to this relationship that matters:",
    "How I showed up with honesty or love recently:",
    "Something I’m proud of about myself today (even if it feels small):",
    "One pattern I noticed and paused before reacting:",
    "One way I calmed or soothed myself instead of seeking outside reassurance:",
    "A boundary I respected for myself (even internally):",
  ],

  "🙏 Gratitude Question Prompts": [
    "What is one thing that happened today that I’m truly grateful for?",
    "Who made a positive impact on my day, and why am I thankful for them?",
    "What simple pleasure did I enjoy today that brought me joy?",
    "What challenge did I face today, and what lesson can I be grateful for from it?",
    "What is something about my health or body that I appreciate today?",
    "What part of my daily routine am I thankful for and why?",
    "What is one thing I often take for granted that I want to appreciate more?",
  ],
  "🧠 Grounding Prompts for Overthinking Moments": [
    "What are the facts, and what is my fear?",
    "Is this situation confusing or actually threatening?",
    "If I saw a friend feeling this way, what would I tell them?",
    "What would a securely attached version of me believe about this moment?",
    "Have I felt this way before and come out the other side okay?",
  ],
  "🌱 Forward-Focused Prompts": [
    "What’s one small thing I can do today to nurture connection (without pressure)?",
    "What kind of partner do I want to be today?",
    "What is enough for me today — not perfect, just enough?",
  ],
  "💛 Relationship-Based Prompts": [
    "One thing my partner did recently that made me feel seen or cared for:",
    "One small moment that made me feel connected (even briefly):",
    "One thing I admire or appreciate about them right now:",
    "One way we’ve grown (as a couple) in the last few weeks/months:",
    "A misunderstanding we worked through — and how we got through it:",
    "One way they’ve shown love that I may not have noticed at first:",
  ],
};

const today = new Date().toISOString().split("T")[0];

export default function App() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("journal-" + selectedDate)) || {};
  });

  const handleChange = (prompt, value) => {
    const updated = { ...entries, [prompt]: value };
    setEntries(updated);
    localStorage.setItem("journal-" + selectedDate, JSON.stringify(updated));
  };

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString('en-CA');
    setSelectedDate(formattedDate);

    const savedEntries = JSON.parse(localStorage.getItem("journal-" + formattedDate)) || {};
    setEntries(savedEntries);
  };

  const handleSave = () => {
    localStorage.setItem("journal-" + selectedDate, JSON.stringify(entries));
    alert("Your entries have been saved!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 to-purple-300 p-8 font-sans text-gray-700">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
        Daily Reflection Journal
      </h1>
      
      <Calendar
  onChange={handleDateChange}
  value={new Date(selectedDate)}
  className="rounded-2xl shadow-xl mx-auto border-4 border-purple-800"
  dayClassName="rounded-full border-2 border-gray-300 shadow-lg hover:bg-gray-100"
/>

      
      {/* Display Selected Date */}
      <p className="text-center mb-6 text-lg text-white">
        Selected Date: <span className="font-bold">{selectedDate}</span>
      </p>

      {/* Display Prompts */}
      {Object.entries(categories).map(([section, prompts]) => (
        <div key={section} className="mb-8">
          <h2 className="text-2xl font-semibold text-center text-purple-800 mb-4">{section}</h2>
          <div className="space-y-6">
            {prompts.map((prompt, index) => (
              <div key={index} className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all">
                <label className="block text-lg font-medium text-gray-900 mb-2">{prompt}</label>
                <textarea
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={entries[prompt] || ""}
                  onChange={(e) => handleChange(prompt, e.target.value)}
                  placeholder="Your answer here..."
                  rows="4"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSave}
          className="bg-pink-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
}
