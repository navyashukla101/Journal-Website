// src/components/PromptSection.jsx
export default function PromptSection({ title, prompts, entries, onChange }) {
  return (
    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-yellow-700 mb-4">{title}</h2>
      {prompts.map((prompt, idx) => (
        <div key={idx} className="mb-4">
          <label className="block mb-2 font-medium">{prompt}</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            rows="3"
            value={entries[prompt] || ""}
            onChange={(e) => onChange(prompt, e.target.value)}
            placeholder="Write your thoughts…"
          />
        </div>
      ))}
    </section>
  );
}
