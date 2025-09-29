import { useState, useEffect } from "react";
import PositionSelector from "../components/PositionSelector";

const ManagerValidation = () => {
  const positions = ["Seater/Names", "Coordinator", "SA", "Server", "ToGo", "Bartender"];
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (selectedPosition) {
      // Fetch users who submitted responses for this position
      fetch(`https://txrhtrainingwebapp.onrender.com/api/responses?position=${selectedPosition}`)
        .then(res => res.json())
        .then(data => {
          // Extract unique users
          const uniqueUsers = [...new Set(data.map(r => r.userId))];
          setEmployees(uniqueUsers);
        })
        .catch(console.error);
    }
  }, [selectedPosition]);

  useEffect(() => {
    if (!selectedEmployee || !selectedPosition) return;
    fetch(`https://txrhtrainingwebapp.onrender.com/api/responses?position=${selectedPosition}&userId=${selectedEmployee}`)
      .then(res => res.json())
      .then(data => setResponses(data))
      .catch(console.error);
  }, [selectedEmployee, selectedPosition]);

  if (!selectedPosition) {
    return <PositionSelector positions={positions} onSelect={setSelectedPosition} />;
  }

  if (!selectedEmployee) {
    return (
      <div>
        <h2>{selectedPosition} - Employees</h2>
        <ul>
          {employees.map(emp => (
            <li key={emp}>
              <button onClick={() => setSelectedEmployee(emp)}>{emp}</button>
            </li>
          ))}
        </ul>
        <button onClick={() => setSelectedPosition(null)}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{selectedEmployee}'s Responses</h2>
      <ul>
        {responses.map(r => (
          <li key={r._id}>
            {r.answers.map(a => (
              <p key={a.questionId}>{a.answer}</p>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={() => setSelectedEmployee(null)}>Back</button>
    </div>
  );
};

export default ManagerValidation;
