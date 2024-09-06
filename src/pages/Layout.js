import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {localStorage.getItem("id_token") === null ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/FromTodo">From</Link>
            </li>
          </ul>
        </nav>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
