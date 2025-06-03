import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found.</div>;

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <button onClick={() => navigate(-1)} style={{
        marginBottom: 20,
        background: '#ff4c4c',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 6,
        cursor: 'pointer'
      }}>
        ← Back
      </button>

      <img src={project.thumbnail} alt={project.title} style={{ width: '100%', borderRadius: 10, marginBottom: 20 }} />
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p><strong>Stack:</strong> {project.stack.join(', ')}</p>
      <p>
        <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a> |{' '}
        <a href={project.github} target="_blank" rel="noreferrer">GitHub Repo</a>
      </p>
    </div>
  );
}

export default ProjectPage;
