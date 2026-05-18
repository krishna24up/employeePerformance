import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">Employee Performance</div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        {user ? (
          <button className="button small" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
