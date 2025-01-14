import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../networks/AuthProvider";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {email, password };
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(response.ok){
        const result = await response.json();
        login(result.token);
        navigate('/');

      }
      else{
        window.alert('Invalid Credentials');
      }

    } catch (error) {
      console.log("error: ", error);    
    }

  };

  
return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-between">
        <div className="col-xxl-7 col-xl-7 col-md-6">
        </div>
        <div className="col-xxl-5 col-xl-5 col-md-6">
          <div className="card p-5 form-bg">
            <div className="card-body">
              <h3 className="text-nowrap">ALREADY A USER?</h3>
              <span className="mb-4 text-secondary">Looking for interactive data Visualization</span>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value = {email}
                    onChange={(e)=>setEmail(e.target.value)}
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
                    value = {password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none text-nowrap">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
