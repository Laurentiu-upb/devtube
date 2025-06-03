import React from 'react';

function Navbar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: '#202020',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ff4c4c' }}>DevTube</div>
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
