import { useState, useEffect } from "react";
import PositionSelector from "../components/PositionSelector";

const Validation = ({ user }) => {
  const positions = ["Seater/Names", "Coordinator", "SA", "Server", "ToGo", "Bartender"];
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedPosition) return;
    setLoading(true);
    setError("");
    fetch(`http://localhost:5000/api/validationQ?position=${encodeURIComponent(selectedPosition)}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then(data => setQuestions(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedPosition]);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!user || !user._id) {
      alert("User not set. Please login again.");
      return;
    }

    const payload = {
      position: selectedPosition,
      userId: user._id,
      answers: questions.map(q => ({ questionId: q._id, answer: answers[q._id] || "" }))
    };

    fetch("http://localhost:5000/api/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to save responses");
        return res.json();
      })
      .then(() => {
        alert("Responses saved!");
        setSelectedPosition(null);
        setAnswers({});
      })
      .catch(err => alert(err.message));
  };

  if (!selectedPosition) {
    return <PositionSelector positions={positions} onSelect={setSelectedPosition} />;
  }

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>{selectedPosition} - Questions</h2>
      {questions.length === 0 && <p>No questions available for this position.</p>}
      {questions.map(q => (
        <div key={q._id} style={{ marginBottom: "1rem" }}>
          <label>{q.text}</label>
          <input
            type="text"
            value={answers[q._id] || ""}
            onChange={e => handleChange(q._id, e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>
      ))}
      <button onClick={handleSubmit} disabled={questions.length === 0}>Submit</button>
      <button onClick={() => setSelectedPosition(null)}>Back</button>
    </div>
  );
};

export default Validation;
