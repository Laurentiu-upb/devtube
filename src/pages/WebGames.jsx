import React from "react";

const WebGames = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Web Games</h2>
      <iframe
        src="/games/snake/index.html"
        title="Snake Game"
        style={{
          width: "100%",
          height: "80vh",
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      />
    </div>
  );
};

export default WebGames;
