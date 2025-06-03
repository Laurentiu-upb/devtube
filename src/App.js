import React from 'react';
import { projects } from './data/projects';
import VideoCard from './components/VideoCard';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DevTube</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map((project, index) => (
          <VideoCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default App;
