import React from 'react';
import { useParams } from 'react-router-dom';
import projects from '../data/projects';
import VideoCard from '../components/VideoCard';

const CategoryProjectsPage = () => {
  const { category } = useParams();
  const filteredProjects = projects.filter(p => p.type === category);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: 'var(--primary-color)' }}>{category} Projects</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(18.75rem, 1fr))',
        gap: '1rem 1.5rem',
        padding: '1.25rem 2rem'
      }}>
        {filteredProjects.map((project, index) => (
          <div key={index}>
            <VideoCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProjectsPage;
