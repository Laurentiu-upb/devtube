import React from 'react';

const cardStyle = {
  width: 320,
  margin: '10px',
  fontFamily: 'Arial, sans-serif',
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

const linkStyle = {
  fontSize: '0.8rem',
  marginTop: '4px',
};

function VideoCard({ project }) {
  return (
    <div style={cardStyle}>
      <img src={project.thumbnail} alt={project.title} style={imageStyle} />
      <div style={titleStyle}>{project.title}</div>
      <div style={descStyle}>{project.description}</div>
      <div style={stackStyle}><strong>Stack:</strong> {project.stack.join(', ')}</div>
      <div style={linkStyle}>
        <a href={project.demo} target="_blank" rel="noreferrer">Live</a> |{' '}
        <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  );
}

export default VideoCard;
