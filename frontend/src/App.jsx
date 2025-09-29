import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Validation from "./pages/Validations";
import ManagerValidation from "./pages/ManagerValidations";
import FirstTimeSetup from "./pages/FirstTimeSetup";

// Placeholder pages for additional buttons
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PracticeTest from "./pages/PracticeTest";
import ClosingChecklist from "./pages/ClosingChecklist";
import FOHTrainee from "./pages/FOHTrainee";
import FOHTrainer from "./pages/FOHTrainer";
import Zaakh from "./pages/Zaakh";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const ProtectedRoute = ({ children, allowedTypes }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedTypes && !allowedTypes.includes(user.userType)) return <Navigate to="/" />;
    return children;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/first-time-setup" element={<FirstTimeSetup setUser={setUser} />} />

        {/* Protected routes wrapped in Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedTypes={["trainee", "trainer", "manager"]}>
              <Layout user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        >
          {/* Nested routes inside Layout Outlet */}
          <Route index element={<Home userType={user?.userType} />} />
          <Route path="validations" element={<Validation />} />
          <Route path="manager-validations" element={<ManagerValidation />} />

          {/* Additional pages for all your other buttons */}
          <Route path="practice-test" element={<PracticeTest />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="settings" element={<Settings />} />
          <Route path="closing-list" element={<ClosingChecklist />} />
          <Route path="foh-trainee" element={<FOHTrainee />} />
          <Route path="foh-trainer" element={<FOHTrainer />} />
          <Route path="zaakh" element={<Zaakh />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
