import React from 'react';

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '90%',
        maxWidth: 600,
        padding: 24,
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        fontFamily: 'Arial'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 12,
          right: 16,
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}>✖</button>

        <img src={project.thumbnail} alt={project.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p><strong>Stack:</strong> {project.stack.join(', ')}</p>
        <p>
          <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a> |{' '}
          <a href={project.github} target="_blank" rel="noreferrer">GitHub Repo</a>
        </p>
      </div>
    </div>
  );
}

export default ProjectModal;
