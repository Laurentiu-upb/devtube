import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showcaseProjects = [
    {
      title: "Smart Launcher",
      image: "/assets/thumbnails/launcher.jpg",
      type: "Windows App",
      description: "Customizable launcher for games, apps, and websites."
    },
    {
      title: "Varroa Mite Classifier",
      image: "/assets/thumbnails/launcher.jpg",
      type: "AI Model / Image Classifier",
      description: "Detects mite infestation on bee colonies from images."
    },
    {
      title: "Snake Web Game",
      image: "/assets/thumbnails/launcher.jpg",
      type: "Web Game",
      description: "Classic snake game built in JavaScript for browsers."
    },
    {
      title: "Smart Launcher",
      image: "/assets/thumbnails/launcher.jpg",
      type: "Windows App",
      description: "Customizable launcher for games, apps, and websites."
    },
    {
      title: "Smart Launcher",
      image: "/assets/thumbnails/launcher.jpg",
      type: "Windows App",
      description: "Customizable launcher for games, apps, and websites."
    },
    {
      title: "Varroa Mite Classifier",
      image: "/assets/thumbnails/launcher.jpg",
      type: "AI Model / Image Classifier",
      description: "Detects mite infestation on bee colonies from images."
    },
    {
      title: "Snake Web Game",
      image: "/assets/thumbnails/launcher.jpg",
      type: "Web Game",
      description: "Classic snake game built in JavaScript for browsers."
    },
    {
      title: "Smart Launcher",
      image: "/assets/thumbnails/launcher.jpg",
      type: "Windows App",
      description: "Customizable launcher for games, apps, and websites."
    }
  ];

  return (
    <div style={{ fontFamily: "sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: 220,
          backgroundImage: "url('/assets/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0 0 12px 12px"
        }}
      />

      {/* Avatar + Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginTop: "0px",
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
            border: "4px solid #fff",
            background: "#fff",
            objectFit: "cover"
          }}
        />
        <div>
          <h2 style={{ margin: 0, fontSize: "1.8rem" }}>Laurentiu</h2>
          <p style={{ margin: "4px 0", color: "#555" }}>
            I'm a developer and creative explorer focused on building tools and telling visual stories.
            <span
              style={{ color: "#1a73e8", cursor: "pointer", fontWeight: 500 }}
              onClick={() => setIsModalOpen(true)}
            > ...more</span>
          </p>
        </div>
      </div>

      {/* Bio Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="About Me"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
          content: {
            maxWidth: 600,
            margin: "auto",
            padding: "24px",
            borderRadius: "10px"
          }
        }}
      >
        <h2>About Me</h2>
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
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 16,
        padding: "16px 40px",
        borderBottom: "1px solid #eee",
        marginBottom: 20
      }}>
{["Projects", "Categories", "About Me", "Contact"].map((tab) => {
  const isActive = activeTab === tab.toLowerCase();
  return (
    <button
      key={tab}
      onClick={() =>
        tab === "Categories"
          ? navigate("/categories")
          : tab === "Contact"
          ? navigate("/contact")
          : setActiveTab(tab.toLowerCase())
      }
      style={{
        background: isActive ? "linear-gradient(135deg, #111, #333)" : "#f5f5f5",
        color: isActive ? "#fff" : "#222",
        border: isActive ? "2px solid #111" : "1px solid #ccc",
        borderRadius: "999px",
        padding: "10px 26px",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: isActive
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 2px 6px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        backdropFilter: "blur(2px)"
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "linear-gradient(135deg, #fafafa, #eaeaea)";
          e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "#f5f5f5";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
        }
      }}
    >
      {tab}
    </button>
  );
})}
      </div>

      {/* Content Area */}
      <div style={{ padding: "0 40px 40px" }}>
        {activeTab === "projects" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            justifyContent: "center"
          }}>
            {showcaseProjects.map((p, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.1)"
              }}>
                <img src={p.image} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: 14 }}>
                  <strong style={{ fontSize: "1rem" }}>{p.title}</strong>
                  <div style={{ color: "#777", fontSize: "0.85rem", marginBottom: 8 }}>{p.type}</div>
                  <p style={{ fontSize: "0.9rem", color: "#333" }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about me" && (
          <div style={{
            marginTop: 24,
            background: "#f6f6f6",
            padding: 24,
            borderRadius: 10,
            lineHeight: 1.7
          }}>
            <p>
              I’m a multi-passionate builder who thrives in both structured and experimental projects. From clean
              UI/UX implementations to machine learning workflows, I enjoy every step of creation.
            </p>
            <p>
              I believe in documenting the process, sharing knowledge, and building for humans — not just machines.
              This portfolio is part of that idea: a showcase of tech, creativity, and authenticity.
            </p>
            <p>
              I’m currently open to collaboration, feedback, and new opportunities. Let’s build something together.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
