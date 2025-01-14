import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        window.alert("Signup successful");
        navigate("/");
      } else {
        window.alert("Error during signup");
      }
    } catch (error) {
      console.log("error signing up: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-end">
        <div className="col-xxl-7 col-xl-7 col-md-6">
        </div>
        <div className="col-xxl-5 col-xl-5 col-md-6">
          <div className="card  p-5 form-bg">
            <div className="card-body">
              <h3 className="text-nowrap">CREATE AN ACCOUNT</h3>
              <span className="mb-4 text-secondary">Start your journey with us</span>
              <form onSubmit={handleSubmit} className="mt-4">

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Create Account
                  </button>
                </div>
              </form>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none text-nowrap">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
