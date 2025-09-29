import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FirstTimeSetup = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const posId = location.state?.posId;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posId) {
      setError("Invalid session. Please login again.");
      return;
    }

    try {
      // Mock API call - replace with backend
      const response = await fetch("https://txrhtrainingwebapp.onrender.com/api/first-time-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posId, firstName, lastName, newPassword })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user); // { posId, firstName, lastName, userType }
        if (data.user.userType === "manager") navigate("/manager-validations");
        else navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>First-Time Setup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ marginTop: "1rem" }}>Save</button>
      </form>
    </div>
  );
};

export default FirstTimeSetup;
