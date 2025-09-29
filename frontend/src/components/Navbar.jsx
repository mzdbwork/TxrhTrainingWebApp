import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className={`navbar`}>
      <div className="logo">
        <Link to="/">TXRH</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li><Link to="/Profile">Profile</Link></li>

        {/* Settings is visible to all */}
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
