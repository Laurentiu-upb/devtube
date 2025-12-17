// App.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import projects from './data/projects';
import ProjectPage from './pages/ProjectPage';
import Sidebar from './components/Sidebar';
import SocialMediaPage from "./pages/SocialMediaPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import WebGames from './pages/WebGames';
import WebApps from './pages/WebApps';
import CvPage from './pages/CvPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProjectsPage from './pages/CategoryProjectsPage';

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
      <div style={{ padding: '0.625rem 1.25rem' }}>
        <div style={{ marginBottom: "0.625rem" }}>
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
                marginRight: "0.5rem",
                padding: '0.375rem 0.75rem',
                borderRadius: "1.25rem",
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
      <div style={{ padding: "1.25rem" }}>
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(18.75rem, 1fr))',
        gap: '1rem 1.5rem',
        padding: '1.25rem 2rem'
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
      marginLeft: sidebarExpanded ? "12.5rem" : "4.5rem",
      paddingTop: "3.5rem",
      paddingRight: "1.5rem",
      paddingLeft: "1.5rem",
      width: `calc(100% - ${sidebarExpanded ? "12.5rem" : "4.5rem"})`
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
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/web-games" element={<WebGames />} />
  <Route path="/web-apps" element={<WebApps />} />
  <Route path="/cv" element={<CvPage />} />
  <Route path="/categories" element={<CategoriesPage />} />
  <Route path="/categories/:category" element={<CategoryProjectsPage />} />
</Routes>


  </div>
</div>

  );
}

export default App;
