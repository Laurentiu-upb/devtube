import React from "react";

const games = [
  {
    title: "Snake 🐍",
    description: "Classic snake game with emoji food, WASD/touch support, and speed scaling.",
    image: "/assets/thumbnails/snake.png",
    path: "/games/snake/index.html",
    color: "#4caf50"
  },
  {
    title: "Math Sprint",
    description: "Test your arithmetic skills against the clock.",
    image: "/assets/thumbnails/math.png",
    path: "/games/math/index.html",
    color: "#2196F3"
  },
  {
    title: "Breakout",
    description: "The timeless brick-breaking arcade game.",
    image: "/assets/thumbnails/breakout.png",
    path: "/games/breakout/index.html",
    color: "#ff55ff"
  },
  {
    title: "Minesweeper",
    description: "A classic game of logic and deduction.",
    image: "/assets/thumbnails/minesweeper.png",
    path: "/games/minesweeper/index.html",
    color: "#f44336"
  },
  {
    title: "Pong",
    description: "The original two-dimensional table tennis simulator.",
    image: "/assets/thumbnails/pong.png",
    path: "/games/pong/index.html",
    color: "#FFC107"
  },
  {
    title: "Papers, Please!",
    description: "A simplified take on the dystopian document thriller.",
    image: "/assets/thumbnails/papers-please.png",
    path: "/games/papers-please/index.html",
    color: "#795548"
  },
  {
    title: "Tetris",
    description: "The classic puzzle game of falling blocks.",
    image: "/assets/thumbnails/tetris.png",
    path: "/games/tetris/index.html",
    color: "#9C27B0"
  },
  {
    title: "Coming Soon 🎮",
    description: "More mini games will be added soon — stay tuned!",
    image: "/assets/thumbnails/coming-soon.png",
    path: "#",
    color: "#888"
  }
];

const WebGames = () => {
  return (
    <div style={{
      background: "var(--background-color)",
      color: "var(--on-background-color)",
      margin: "0 auto",
      padding: "2.5rem 1.5rem",
      maxWidth: "75rem",
      fontFamily: "'Inter', sans-serif"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "2.5rem", color: "var(--primary-color)" }}>🎮 Web Games</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(17.5rem, 1fr))",
        gap: "1.5rem",
        justifyItems: "center"
      }}>
        {games.map((game, i) => (
          <a
            key={i}
            href={game.path}
            style={{
              width: "100%",
              textDecoration: "none",
              color: "inherit",
              display: 'block'
            }}
            onMouseEnter={(e) => {
                if (game.path === "#") return;
                e.currentTarget.style.transform = "translateY(-0.25rem)";
                e.currentTarget.style.boxShadow = `0 0.375rem 1.25rem rgba(0,0,0,0.3)`;
                e.currentTarget.firstChild.style.borderColor = game.color;
            }}
            onMouseLeave={(e) => {
                if (game.path === "#") return;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.firstChild.style.borderColor = '#333';
            }}
          >
            <div style={{
              height: "100%",
              background: "var(--surface-color)",
              borderRadius: "0.875rem",
              border: `0.125rem solid ${game.path === '#' ? '#444' : '#333'}`,
              overflow: "hidden",
              transition: "all 0.2s ease-in-out",
            }}>
              <img
                src={game.image}
                alt={game.title}
                style={{
                  width: "100%",
                  height: "10rem",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <div style={{ padding: "1rem" }}>
                <div style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                  color: game.color
                }}>{game.title}</div>

                <div style={{
                  fontSize: "0.95rem",
                  color: "#aaa",
                  lineHeight: 1.5
                }}>
                  {game.description}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WebGames;
