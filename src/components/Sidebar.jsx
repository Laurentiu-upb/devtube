// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ expanded }) {
  const navigate = useNavigate();

  const navItem = (label, icon, action, isExternal = false) => (
    <div
      key={label}
      onClick={() => isExternal ? window.open(action, "_blank") : navigate(action)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: expanded ? "1rem" : 0,
        justifyContent: expanded ? "flex-start" : "center",
        padding: "0.5rem 0.6rem",
        borderRadius: "0.4rem",
        fontSize: "0.9rem",
        color: "var(--on-surface-color)",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
        whiteSpace: "nowrap",
        overflow: "hidden",
        height: "2.2rem", // Set a fixed height for all items
        marginBottom: "0.2rem" // Add some space between items
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2a2a2a"}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
    >
      <span style={{ fontSize: "1.2rem", width: "1.3rem", textAlign: "center", display: "flex", alignItems: "center" }}>{icon}</span>
      {expanded && <span style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>}
    </div>
  );

  return (
    <div style={{
      width: expanded ? "12rem" : "4.5rem",
      backgroundColor: "var(--surface-color)",
      color: "var(--on-surface-color)",
      height: "100vh",
      paddingTop: "4rem", // Space for the navbar
      paddingLeft: "0.6rem",
      paddingRight: "0.6rem",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
      transition: "width 0.2s ease",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0.1rem 0 0.25rem rgba(0,0,0,0.3)",
      borderRight: "0.05rem solid #2a2a2a"
    }}>
      {navItem("Home", "🏠", "/")}
      {navItem("Profile", "👤", "/profile")}
      {navItem("Categories", "🗂", "/categories")}
      {navItem("Contact", "📬", "/contact")}
    </div>
  );
}

export default Sidebar;
