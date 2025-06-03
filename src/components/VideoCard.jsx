// VideoCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  width: 320,
  margin: '10px',
  fontFamily: 'Arial, sans-serif',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
};

const imageStyle = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
};

const titleStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '4px',
};

const descStyle = {
  fontSize: '0.85rem',
  marginBottom: '6px',
  color: '#333'
};

const stackStyle = {
  fontSize: '0.75rem',
  fontStyle: 'italic',
  color: '#666'
};

function VideoCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`, { replace: true })}
      style={{
        width: 320,
        margin: 10,
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 8,
          marginBottom: 8
        }}
      />
      <h3>{project.title}</h3>
      <p style={{ fontSize: "0.85rem" }}>{project.description}</p>
    </div>
  );
}

export default VideoCard;
