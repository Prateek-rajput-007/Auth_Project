import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuth(false);
    setUser({});
    localStorage.removeItem("token"); // Clear token on logout
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const hoverStyle = {
    color: 'red',
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-5 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">
        <Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
          🎶 MelodyVerse
        </Link>
      </h1>

      <div className="flex gap-5">
        <Link to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
          Home
        </Link>
        {isAuth ? (
          <>
            <Link to="/profile" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              style={linkStyle}
              onMouseEnter={(e) => e.target.style.color = hoverStyle.color}
              onMouseLeave={(e) => e.target.style.color = linkStyle.color}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
              Login
            </Link>
            <Link to="/signup" style={linkStyle} onMouseEnter={(e) => e.target.style.color = hoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
