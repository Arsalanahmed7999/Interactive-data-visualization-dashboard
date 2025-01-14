import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../networks/AuthProvider";

export const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
    console.log("Logged out successfully");
  };

  return (

    <div className="sticky-top">
          {
      authToken &&
      <nav className="navbar navbar-expand-lg myNavbar">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fs-" to="/">
          Visualization
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li> 
          </ul>
          <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
          {!authToken && 
            <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/login">
              Login
            </Link>
          </li>
            }
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/signup">
                New Account
              </Link>
            </li>
            {authToken && <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={handleLogout}
                style={{ textDecoration: "none", color: "inherit" }}>
                Logout
              </button>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
    }

    </div>
  );
};
