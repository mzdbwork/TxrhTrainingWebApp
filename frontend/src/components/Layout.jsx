import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ user, setUser }) => {
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
