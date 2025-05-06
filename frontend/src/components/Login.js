import React, { useState } from "react";
import { authService } from "../services/api";
import "../styles/loginstyle.css";

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [requireOtp, setRequireOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (requireOtp) {
        const data = await authService.verifyOtp(email, otpToken);
        onLogin(data.user);
      } else {
        const data = await authService.login(email, password);
        if (data.requireOtp) {
          setRequireOtp(true);
        } else {
          onLogin(data.user);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={requireOtp}
          />
        </div>
        
        {!requireOtp ? (
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="otp">One-Time Password</label>
            <input
              type="text"
              id="otp"
              value={otpToken}
              onChange={(e) => setOtpToken(e.target.value)}
              required
            />
            <small>Please enter the OTP from your authenticator app</small>
          </div>
        )}
        
        <button 
          type="submit" 
          className="login-btn" 
          disabled={loading}
        >
          {loading ? "Processing..." : requireOtp ? "Verify OTP" : "Login"}
        </button>
      </form>
      
      <p className="signup-link">
        Don't have an account? <button onClick={switchToSignup}>Sign up</button>
      </p>
    </div>
  );
}

export default Login;
