// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import projects from './data/projects';
import ProjectPage from './pages/ProjectPage';
import Sidebar from './components/Sidebar';
import SocialMediaPage from "./pages/SocialMediaPage";

function Home({ query, selectedTag, setQuery, setSelectedTag }) {
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
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px 24px',
        padding: '20px 32px'
        }}
      >
        {filteredProjects.map((project, index) => (
            <div key={index}>
              <VideoCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
<div style={{ display: "flex" }}>
  <Sidebar expanded={sidebarExpanded} />
  <div
    style={{
      marginLeft: sidebarExpanded ? 200 : 72,
      paddingTop: 56,
      paddingRight: 24,
      paddingLeft: 24,
      width: `calc(100% - ${sidebarExpanded ? 200 : 72}px)`
    }}
  >

    <Navbar
  onSearch={(q) => {
    setQuery(q);
    setSelectedTag('');
  }}
  onToggleSidebar={() => setSidebarExpanded((prev) => !prev)}
/>

    <Routes>
      <Route
  path="/"
  element={
    <Home
      query={query}
      selectedTag={selectedTag}
      setQuery={setQuery}
      setSelectedTag={setSelectedTag}
    />
  }
/>

      <Route path="/project/:slug" element={<ProjectPage />} />
      <Route path="/socials" element={<SocialMediaPage />} />
      {/* other routes */}
    </Routes>
  </div>
</div>

  );
}

export default App;
