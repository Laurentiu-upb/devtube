import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InDevelopmentPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAccess = () => {
    if (password === "devpass") {
      localStorage.setItem("access_granted", "true");
      navigate("/profile");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f4f4",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem" }}>🚧 DevTube is in Development</h1>
      <p style={{ marginBottom: 20 }}>Enter the password, then refresh the site.</p>
      <input
        type="password"
        placeholder="Enter password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px 14px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: 12
        }}
      />
      <button onClick={handleAccess} style={{
        background: "#1a73e8",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}>
        Access
      </button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default InDevelopmentPage;
