import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function AuthPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="auth-container">
      {showLogin ? (
        <Login 
          onLogin={onLogin} 
          switchToSignup={() => setShowLogin(false)} 
        />
      ) : (
        <Signup 
          switchToLogin={() => setShowLogin(true)} 
        />
      )}
    </div>
  );
}

export default AuthPage;