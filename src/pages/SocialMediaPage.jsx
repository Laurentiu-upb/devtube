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
      color: "#FFFFFF"
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
      color: "#FFFFFF"
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
      color: "#FFFFFF"
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
      margin: "2rem auto",
      padding: "0 1rem",
      maxWidth: "75rem",
      fontFamily: "'Inter', sans-serif",
      color: 'var(--on-background-color)'
    }}>
      {/* Avatar + Header */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2rem"
      }}>
        <img
          src="/assets/avatar.png"
          alt="Laurentiu Avatar"
          style={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "1rem",
            border: "0.125rem solid var(--primary-color)"
          }}
        />
        <h1 style={{ margin: 0, fontSize: "1.75rem", color: 'var(--primary-color)' }}>Laurentiu’s Social Hub</h1>

        <div style={{
          marginTop: "1.25rem",
          maxWidth: "45rem",
          textAlign: "center",
          background: "var(--surface-color)",
          borderRadius: "0.75rem",
          padding: "1.25rem 1.75rem",
          fontSize: "1rem",
          lineHeight: 1.6,
          color: "#ccc",
          border: "0.0625rem solid #333"
        }}>
          Hey, I’m <strong>Laurentiu</strong> 👋 — a developer and creative explorer.<br />
          I build things with <span style={{ color: "var(--secondary-color)", fontWeight: 600 }}>code</span>,
          tell stories through <span style={{ color: "#E1306C", fontWeight: 600 }}>photography</span>,
          and love sharing across platforms.<br />
          You’ll find me working on tools, experiments, and a bit of everything in between 🚀
        </div>
      </div>

      {/* Social Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(12.5rem, 1fr))",
        gap: "3.5rem",
        justifyItems: "center"
      }}>
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "100%",
              minHeight: "14rem",
              borderRadius: "0.75rem",
              background: "var(--surface-color)",
              border: `0.0625rem solid #333`,
              textDecoration: "none",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.2s ease",
              color: "var(--on-surface-color)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-0.25rem)";
              e.currentTarget.style.boxShadow = `0 0.375rem 1rem rgba(0,0,0,0.3)`
              e.currentTarget.style.borderColor = `var(--primary-color)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.borderColor = `#333`
            }}
          >
            <div style={{
              width: "3rem",
              height: "3rem",
              marginBottom: "0.875rem",
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
                  objectFit: "contain",
                  filter: s.name === 'Threads' || s.name === 'GitHub' || s.name === 'TikTok' ? 'invert(1)' : 'none'
                }}
              />
            </div>

            <div style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "0.375rem",
              color: s.color
            }}>{s.name}</div>

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard(s.handle);
              }}
              style={{
                fontSize: "0.9rem",
                color: "#aaa",
                marginBottom: "0.25rem",
                cursor: "pointer",
                textDecoration: "underline dotted",
              }}
              title="Click to copy handle"
            >
              {s.handle}
            </div>

            <div style={{
              fontSize: "0.85rem",
              color: "#888",
              textAlign: "center",
              marginBottom: "0.5rem"
            }}>{s.description}</div>

            <div style={{
              fontSize: "0.8rem",
              color: "#777",
              marginTop: "auto"
            }}>
              {s.latest}
            </div>

            <div style={{
              fontSize: "0.75rem",
              marginTop: "0.25rem",
              color: s.status === "Active" ? "var(--secondary-color)" : "#777",
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
