import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about me");

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "var(--background-color)", color: "var(--on-background-color)", minHeight: "100vh" }}>
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: 220,
          backgroundImage: "url('/assets/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Avatar + Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginTop: "-48px",
        padding: "0 40px",
        gap: 20
      }}>
        <img
          src="/assets/avatar.png"
          alt="Avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "4px solid var(--background-color)",
            background: "var(--surface-color)",
            objectFit: "cover"
          }}
        />
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '1rem',
          borderRadius: '8px',
          backdropFilter: 'blur(5px)'
        }}>
          <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold" }}>Laurentiu</h2>
          <p style={{ margin: "4px 0", color: "#aaa" }}>
            I'm a developer and creative explorer focused on building tools and telling visual stories.
            <span
              style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: 500, marginLeft: '4px' }}
              onClick={() => setActiveTab("about me")}
            > ...more</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 16,
        padding: "16px 40px",
        borderBottom: "1px solid #333",
        marginBottom: 20
      }}>
{[
  { label: "About Me", action: () => setActiveTab("about me") },
  { label: "Projects by Categories", action: () => navigate("/categories") },
  { label: "Social Media", action: () => navigate("/socials") },
  { label: "CV", action: () => navigate("/cv") },
].map((tab) => {
  const isActive = activeTab === tab.label.toLowerCase();
  return (
    <button
      key={tab.label}
      onClick={tab.action}
      style={{
        background: "transparent",
        color: isActive ? "var(--primary-color)" : "var(--on-surface-color)",
        border: "none",
        borderBottom: isActive ? `2px solid var(--primary-color)` : "2px solid transparent",
        padding: "10px 0px",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginRight: '16px'
      }}
    >
      {tab.label}
    </button>
  );
})}
      </div>

      {/* Content Area */}
      <div style={{ padding: "0 40px 40px" }}>
        {activeTab === "about me" && (
          <div style={{
            marginTop: 24,
            background: "var(--surface-color)",
            padding: 24,
            borderRadius: 10,
            lineHeight: 1.7,
            border: '1px solid #333'
          }}>
            <h2 style={{color: 'var(--primary-color)', marginTop: 0}}>About Me</h2>
            <p>
              Hey! I'm Laurentiu, a passionate developer and visual thinker who enjoys merging tech with creativity.
              Whether I'm building a custom launcher for productivity, training AI to spot pests in beekeeping, or just
              creating a nostalgic game like Snake — I’m always exploring new ideas.
            </p>
            <p>
              My interests stretch across automation, design systems, educational content, and tiny web tools that
              make everyday tasks easier. Outside of coding, I enjoy photography and documenting the world around me.
            </p>
            <p>
              I'm currently building DevTube — my portfolio styled like YouTube, and experimenting with smart productivity tools
              and real-time interfaces.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
