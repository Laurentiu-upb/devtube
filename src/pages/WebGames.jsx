import React from "react";
import { useNavigate } from "react-router-dom";

const games = [
  {
    title: "Snake 🐍",
    description: "Classic snake game with emoji food, WASD/touch support, and speed scaling.",
    image: "/assets/avatar.png",
    path: "/games/snake/index.html",
    color: "#4caf50"
  },
  {
    title: "Math Sprint",
    description: "+-*/",
    image: "/assets/avatar.png",
    path: "/games/math/index.html",
    color: "#4cad50"
  },
  {
    title: "Breakout",
    description: "Breakout game | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/breakout.html",
    color: "#ff55ff"
  },
  {
    title: "Color",
    description: "Coloring game | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/breakout.html",
    color: "#ff55ff"
  },
  {
    title: "minesweeper",
    description: "minesweeper game | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/minesweeper.html",
    color: "#ff55ff"
  },
  {
    title: "Pong",
    description: "Ping-Pong game | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/pong.html",
    color: "#ff55ff"
  },
  {
    title: "Paper, Please!",
    description: "paper please game copy | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/pp.html",
    color: "#ff55ff"
  },
  {
    title: "Snake v2.0",
    description: "snake game | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/snake2.html",
    color: "#ff55ff"
  },
  {
    title: "Tetris",
    description: "Tetris game style | GPT5-Style",
    image: "/assets/avatar.png",
    path: "/games/mini-games/tetris.html",
    color: "#ff55ff"
  },
  {
    title: "Coming Soon 🎮",
    description: "More mini games will be added soon — stay tuned!",
    image: "/assets/avatar.png",
    path: "#",
    color: "#888"
  }
];

const WebGames = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      margin: "40px auto",
      padding: "0 24px",
      maxWidth: "1200px"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>🎮 WEB GAMES</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "40px",
        justifyItems: "center"
      }}>
        {games.map((game, i) => (
          <a
            key={i}
            href={game.path}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 240,
              minHeight: 320,
              borderRadius: 14,
              background: "#fff",
              border: `3px solid ${game.color}`,
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
              e.currentTarget.style.boxShadow = `0 6px 16px ${game.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
            }}
          >
            <div style={{
              width: "100%",
              height: 120,
              overflow: "hidden",
              borderRadius: 10,
              marginBottom: 16
            }}>
              <img
                src={game.image}
                alt={game.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>

            <div style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1rem",
              marginBottom: 6
            }}>{game.title}</div>

            <div style={{
              fontSize: "0.9rem",
              color: "#555",
              textAlign: "center"
            }}>
              {game.description}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WebGames;
