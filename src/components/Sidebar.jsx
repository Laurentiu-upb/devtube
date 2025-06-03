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
        gap: expanded ? 16 : 0,
        justifyContent: expanded ? "flex-start" : "center",
        padding: "10px 12px",
        borderRadius: 10,
        fontSize: "0.9rem",
        color: "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
        overflow: "hidden"
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#373737"}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
    >
      <span style={{ fontSize: "1.2rem", width: 24, textAlign: "center" }}>{icon}</span>
      {expanded && <span>{label}</span>}
    </div>
  );

  return (
    <div style={{
      width: expanded ? 200 : 72,
      backgroundColor: "#0f0f0f",
      color: "#fff",
      height: "100vh",
      paddingTop: 72,
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      transition: "width 0.2s ease",
      fontFamily: "Arial, sans-serif",
      boxShadow: "2px 0 4px rgba(0,0,0,0.2)"
    }}>
      {navItem("Home", "🏠", "/")}
      {navItem("Profile", "👤", "/profile")}
      {navItem("Categories", "🗂", "/categories")}
      {navItem("Contact", "📬", "/contact")}
      <hr style={{ borderColor: "#444", width: "100%" }} />
      {navItem("My Social Media", "📱", "/socials")}
      {navItem("My LinkedIn Page", "🔗", "https://linkedin.com/in/YOUR-LINK", true)}
      {navItem("My GitHub Page", "🧑‍💻", "https://github.com/Laurentiu-upb", true)}
      {navItem("My CV", "📄", "/cv")}
    </div>
  );
}

export default Sidebar;
