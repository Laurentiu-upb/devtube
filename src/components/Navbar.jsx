// Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch, onToggleSidebar }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: "3.5rem",
      backgroundColor: 'var(--surface-color)',
      color: 'var(--on-surface-color)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      justifyContent: 'space-between',
      boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      
      {/* LEFT: ☰ + logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: "1rem" }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: 'var(--on-surface-color)',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ☰
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
          <div style={{
            width: "1.75rem",
            height: "1.25rem",
            backgroundColor: 'var(--primary-color)',
            borderRadius: "0.25rem",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: "0.875rem",
            color: 'var(--on-primary-color)'
          }}>
            ▶
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: "'Inter', sans-serif" }}>DevTube</span>
        </div>
      </div>

      {/* CENTER: back button + search bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: 'var(--on-surface-color)',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem'
          }}
        >
          ←
        </button>
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--background-color)',
          border: `0.0625rem solid ${isSearchFocused ? 'var(--primary-color)' : '#333'}`,
          borderRadius: "1.25rem",
          overflow: 'hidden',
          width: '100%',
          maxWidth: "31.25rem",
          height: "2.375rem",
          transition: 'border-color 0.3s ease'
        }}>
          <input
            type="text"
            placeholder="Search"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--on-background-color)',
              padding: '0 1rem',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
          <div style={{
            width: "3rem",
            backgroundColor: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            🔍
          </div>
        </div>
      </div>

      {/* RIGHT: User Icon */}
      <div style={{
        width: "2rem",
        height: "2rem",
        borderRadius: '50%',
        backgroundColor: 'var(--primary-variant-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'var(--on-primary-color)'
      }}>
        G
      </div>
    </div>
  );
}

export default Navbar;
