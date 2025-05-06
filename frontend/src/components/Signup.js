import React, { useState } from "react";
import { authService } from "../services/api";
import "../styles/loginstyle.css";

function Signup({ switchToLogin }) {
  const [formData, setFormData] = useState({
    personal_id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone_number: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Remove confirmPassword as it's not needed in the API
      const { confirmPassword, ...userData } = formData;
      await authService.signup(userData);
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        switchToLogin();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Account created successfully! Redirecting to login...</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="personal_id">Personal ID</label>
          <input
            type="text"
            id="personal_id"
            value={formData.personal_id}
            onChange={handleChange}
            required
          />
          <small>ID Card, Passport, etc.</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address (Optional)</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number (Optional)</label>
          <input
            type="text"
            id="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        
        <button 
          type="submit" 
          className="login-btn" 
          disabled={loading || success}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>
      
      <p className="signup-link">
        Already have an account? <button onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Signup;
