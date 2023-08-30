import React from "react";
import axios from "axios";

function Register() {
  const submitData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const registerValue = Object.fromEntries(data);
    const result = await axios.post(
      "http://localhost:3000/api/admin",
      registerValue
    );
    console.log(result);
  };

  return (
    <div className="registerForm">
      <form onSubmit={submitData}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="admin_name"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="admin_password"
            required
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="first_name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="last_name"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
