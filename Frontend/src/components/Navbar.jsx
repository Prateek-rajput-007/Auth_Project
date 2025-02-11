import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { isAuth } = useContext(AuthContext);

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const hoverStyle = {
    color: 'red',
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">MelodyVerse</h1>
      <div>
        <Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
          Home
        </Link>
        {isAuth && (
          <Link to="/profile" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
            Profile
          </Link>
        )}
        {!isAuth && (
          <Link to="/login" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
