import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h1>Notes Management</h1>

      <Link to="/create">
        <button>Create Note</button>
      </Link>
    </div>
  );
}

export default Header;
