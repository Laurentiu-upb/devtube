// VideoCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

function VideoCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`, { replace: true })}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        backgroundColor: "#fff",
        border: "1px solid #ddd"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          display: "block"
        }}
      />

      {/* footer */}
      <div style={{
        backgroundColor: "#f9f9f9",
        padding: "10px 12px",
        borderTop: "1px solid #e0e0e0"
      }}>
        <div style={{
          fontWeight: "bold",
          fontSize: "0.95rem",
          color: "#111",
          marginBottom: 4,
        }}>
          {project.title}
        </div>
        <div style={{
          fontSize: "0.8rem",
          color: "#666",
          textTransform: "capitalize"
        }}>
          {project.type || "web app"}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
