import React from "react";

function SocialMediaPage() {
  const socials = [
    {
      name: "YouTube",
      icon: "/assets/logos/youtube.png",
      url: "https://youtube.com/@xlaurentiu6587",
      handle: "@xlaurentiu6587",
      description: "Video uploads, project trailers",
      status: "Active",
      latest: "Last video: 2 days ago",
      color: "#FF0000"
    },
    {
      name: "Instagram (Personal)",
      icon: "/assets/logos/instagram.png",
      url: "https://www.instagram.com/laurentiu.xlr",
      handle: "@laurentiu.xlr",
      description: "Life, style & story moments",
      status: "Active",
      latest: "Story posted: today",
      color: "#E1306C"
    },
    {
      name: "Instagram (Photography)",
      icon: "/assets/logos/instagram.png",
      url: "https://www.instagram.com/journal.xlr",
      handle: "@journal.xlr",
      description: "Street & travel photography",
      status: "Paused",
      latest: "Last post: March 2024",
      color: "#FE88FA"
    },
    {
      name: "Threads",
      icon: "/assets/logos/threads.png",
      url: "https://www.threads.com/@laurentiu.xlr",
      handle: "@laurentiu.xlr",
      description: "Casual thoughts & behind the scenes",
      status: "Active",
      latest: "Posted last week",
      color: "#000"
    },
    {
      name: "Facebook",
      icon: "/assets/logos/facebook.png",
      url: "https://www.facebook.com/xlaur3440/",
      handle: "xlaur3440",
      description: "Friends & dev updates",
      status: "Active",
      latest: "Post shared last week",
      color: "#1877F2"
    },
    {
      name: "TikTok",
      icon: "/assets/logos/tiktok.png",
      url: "https://www.tiktok.com/@laurentiu.xlr",
      handle: "@laurentiu.xlr",
      description: "Fun, dev humor & experiments",
      status: "Active",
      latest: "New TikTok last week",
      color: "#010101"
    },
    {
      name: "Discord",
      icon: "/assets/logos/discord.png",
      url: "https://discord.gg/EP2Vpstn",
      handle: "Laurentiu#9999",
      description: "Hangout & collab server",
      status: "Active",
      latest: "Server online",
      color: "#5865F2"
    },
    {
      name: "GitHub",
      icon: "/assets/logos/github.png",
      url: "https://github.com/Laurentiu-upb",
      handle: "Laurentiu-upb",
      description: "Open source + DevTube",
      status: "Active",
      latest: "Updated 1 repo this month",
      color: "#333"
    },
    {
      name: "Reddit",
      icon: "/assets/logos/reddit.png",
      url: "https://www.reddit.com/user/laurentiu_xlr/",
      handle: "u/laurentiu_xlr",
      description: "Comments, tech, and communities",
      status: "Active",
      latest: "Commented yesterday",
      color: "#FF4500"
    },
    {
      name: "LinkedIn",
      icon: "/assets/logos/linkedin.png",
      url: "https://www.linkedin.com/in/laurențiu-b-966662197",
      handle: "Laurentiu B.",
      description: "Professional updates",
      status: "Active",
      latest: "Last post: April 2025",
      color: "#0077B5"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard`);
  };

  return (
    <div style={{
      margin: "40px auto",
      padding: "0 24px",
      maxWidth: "1200px"
    }}>
      {/* Avatar + Header */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20
      }}>
        <img
          src="/assets/avatar.png"
          alt="Laurentiu Avatar"
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 16,
            boxShadow: "0 0 8px rgba(0,0,0,0.2)"
          }}
        />
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Laurentiu’s Social Hub</h1>

        <div style={{
          marginTop: 20,
          maxWidth: 720,
          textAlign: "center",
          background: "linear-gradient(145deg, #f2f2f2, #cccccc)",
          borderRadius: "14px",
          padding: "24px 32px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          fontSize: "1rem",
          lineHeight: 1.6,
          color: "#333"
        }}>
          Hey, I’m <strong>Laurentiu</strong> 👋 — a developer and creative explorer.<br />
          I build things with <span style={{ color: "#4e91f9", fontWeight: 600 }}>code</span>,
          tell stories through <span style={{ color: "#e1306c", fontWeight: 600 }}>photography</span>,
          and love sharing across platforms.<br />
          You’ll find me working on tools, experiments, and a bit of everything in between 🚀
        </div>
      </div>

      {/* Social Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "40px",
        justifyItems: "center"
      }}>
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 240,
              minHeight: 320,
              borderRadius: 14,
              background: "#fff",
              border: `3px solid ${s.color}`,
              textDecoration: "none",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.2s ease",
              color: "#111",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 6px 16px ${s.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img
                src={s.icon}
                alt={s.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain"
                }}
              />
            </div>

            <div style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1rem",
              marginBottom: 6
            }}>{s.name}</div>

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard(s.handle);
              }}
              style={{
                fontSize: "0.9rem",
                color: "#555",
                marginBottom: 4,
                cursor: "pointer",
                textDecoration: "underline dotted",
              }}
              title="Click to copy handle"
            >
              {s.handle}
            </div>

            <div style={{
              fontSize: "0.8rem",
              color: "#777",
              textAlign: "center",
              marginBottom: 8
            }}>{s.description}</div>

            <div style={{
              fontSize: "0.75rem",
              color: "#888",
              marginTop: "auto"
            }}>
              {s.latest}
            </div>

            <div style={{
              fontSize: "0.7rem",
              marginTop: 4,
              color: s.status === "Active" ? "#4CAF50" : "#999",
              fontWeight: "bold"
            }}>
              {s.status}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaPage;
