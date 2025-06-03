// App.js

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import projects from './data/projects';
import ProjectPage from './pages/ProjectPage';

function Home() {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const navigate = useNavigate();

  const allTags = [...new Set(projects.flatMap(p => p.tags))];

  const filteredProjects = projects.filter((project) => {
    const q = query.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.join(',').toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Navbar onSearch={(q) => {
        setQuery(q);
        setSelectedTag('');
      }} />

      {/* Tag buttons */}
      <div style={{ padding: '10px 20px' }}>
        <div style={{ marginBottom: 10 }}>
          {[...new Set([selectedTag, ...allTags.filter(tag => tag !== selectedTag)])].map((tag, i) => (
            <button
              key={i}
              onClick={() => {
                if (tag === selectedTag) {
                  setSelectedTag('');
                  setQuery('');
                } else {
                  setSelectedTag(tag);
                  setQuery(tag);
                }
              }}
              style={{
                marginRight: 8,
                padding: '6px 12px',
                borderRadius: 20,
                backgroundColor: tag === selectedTag ? '#ff4c4c' : '#eee',
                color: tag === selectedTag ? '#fff' : '#000',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: tag === selectedTag ? 'bold' : 'normal'
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Project cards */}
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredProjects.map((project, index) => (
            <div key={index} style={{ cursor: 'pointer' }}>
              <a href={`#${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <VideoCard project={project} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
