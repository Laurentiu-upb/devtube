// Navbar.jsx

import React from "react";

function Navbar({ onSearch, onToggleSidebar }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 60,
      backgroundColor: '#202020',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 1000,
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
    }}>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ☰
        </button>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ff4c4c' }}>DevTube</div>
      </div>

      <input
        type="text"
        placeholder="Search projects..."
        onChange={handleChange}
        style={{
          padding: '6px 10px',
          borderRadius: 4,
          border: 'none',
          width: 200,
        }}
      />
    </div>
  );
}

export default Navbar;
