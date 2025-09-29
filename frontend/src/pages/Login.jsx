import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [posId, setPosId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mock API call - replace with real backend
      const response = await fetch("https://txrhtrainingwebapp.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posId, password })
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user); // always set user first

        if (data.firstTime) {
          // Redirect first-time users to setup page
          navigate("/first-time-setup", { state: { posId } });
        } else {
          // All users go to Home, Home.jsx renders correct cards
          navigate("/"); 
        }
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>POS ID:</label>
          <input
            type="text"
            value={posId}
            onChange={(e) => setPosId(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ marginTop: "1rem" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
