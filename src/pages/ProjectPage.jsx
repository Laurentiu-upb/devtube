// ProjectPage.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SmartLauncherPage from "./project-pages/SmartLauncherPage";
import DevTubePage from "./project-pages/DevTubePage";
import SnakeWebPage from "./project-pages/SnakeWebPage";

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const pages = {
    smartlauncher: <SmartLauncherPage />,
    devtube: <DevTubePage />,
    snakeweb: <SnakeWebPage />,
  };

  const pageComponent = pages[slug];

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <button
        onClick={() => navigate("/", { replace: true })}
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          background: "#ff4c4c",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        ← Back to Home
      </button>

      {pageComponent ? (
        pageComponent
      ) : (
        <div>
          <h2>404 – Project not found</h2>
          <p>No page exists for slug: <strong>{slug}</strong></p>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
