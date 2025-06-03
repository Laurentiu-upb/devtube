// ProjectPage.jsx

import React from "react";
import { useParams } from "react-router-dom";

import SmartLauncherPage from "./project-pages/SmartLauncherPage";
import DevTubePage from "./project-pages/DevTubePage";
import SnakeWebPage from "./project-pages/SnakeWebPage";

function ProjectPage() {
  const { slug } = useParams();

  const pages = {
    smartlauncher: <SmartLauncherPage />,
    devtube: <DevTubePage />,
    snakeweb: <SnakeWebPage />,
  };

  const pageComponent = pages[slug];

  return pageComponent ? (
    pageComponent
  ) : (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>404 – Project not found</h2>
      <p>No page exists for slug: <strong>{slug}</strong></p>
    </div>
  );
}

export default ProjectPage;
