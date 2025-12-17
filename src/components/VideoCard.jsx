// VideoCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

function VideoCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`, { replace: true })}
      style={{
        borderRadius: "0.5rem",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        backgroundColor: "#fff",
        border: "0.0625rem solid #ddd"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 0.375rem 1.25rem rgba(0,0,0,0.2)";
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
          height: "11.25rem",
          objectFit: "cover",
          display: "block"
        }}
      />

      {/* footer */}
      <div style={{
        backgroundColor: "#f9f9f9",
        padding: "0.625rem 0.75rem",
        borderTop: "0.0625rem solid #e0e0e0"
      }}>
        <div style={{
          fontWeight: "bold",
          fontSize: "0.95rem",
          color: "#111",
          marginBottom: "0.25rem",
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
