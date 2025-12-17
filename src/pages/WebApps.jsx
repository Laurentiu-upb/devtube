import React from "react";

const WebApps = () => {
  return (
    <div style={{
      padding: "2.5rem",
      fontFamily: "'Inter', sans-serif",
      background: "var(--background-color)",
      color: "var(--on-background-color)",
      minHeight: "calc(100vh - 3.5rem)",
      textAlign: "center"
    }}>
      <h2 style={{ color: "var(--primary-color)" }}>Web Apps</h2>
      <p style={{ color: "#aaa" }}>
        Coming soon... This page will include demos and app utilities.
      </p>
    </div>
  );
};

export default WebApps;
