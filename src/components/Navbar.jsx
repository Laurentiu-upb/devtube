// Navbar.jsx

import React from "react";

function Navbar({ onSearch, onToggleSidebar }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 56,
      backgroundColor: '#0f0f0f',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
      zIndex: 1000
    }}>
      
      {/* LEFT: ☰ + logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.4rem',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>

<button
  onClick={() => {
    localStorage.removeItem("devtube_access");
    window.location.href = "/";
  }}
  style={{
    marginLeft: "auto",
    background: "#e74c3c",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Logout
</button>


        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 24,
            height: 18,
            backgroundColor: '#ff0000',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 14
          }}>
            ▶
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>DevTube</span>
        </div>
      </div>

      {/* CENTER: search bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          backgroundColor: '#121212',
          border: '1px solid #333',
          borderRadius: 20,
          overflow: 'hidden',
          width: 400,
          height: 36,
        }}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              padding: '0 12px',
              outline: 'none'
            }}
          />
          <div style={{
            width: 48,
            backgroundColor: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '1px solid #333',
            cursor: 'pointer'
          }}>
            🔍
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
