# 🚧 DevTube – Personal Portfolio Hub

Welcome to **DevTube**, a YouTube-inspired personal portfolio web app designed to showcase projects, social presence, games, and more.

---

## ✅ Implemented Features

### 🔵 General Structure
- Sidebar with navigation (compact/full view)
- Responsive YouTube-like `ProfilePage`
- `SocialMediaPage` with vertical interactive cards (copy handle, status, last activity)
- `ContactPage` with:
  - Form validation for email/message (required), PDF only file upload
  - Simulated submission (logs to console)
  - Personal info + quick DM links (WhatsApp, Instagram, Messenger)
- `WebGames` page with:
  - Snake game: animated food, score, difficulty scaling
  - WASD, touch support, overlays for Game Over + Restart
- `WebApps` placeholder page for future mini tools
- `CVPage` displaying CV content with download button
- `InDevelopmentPage` (password-protected mode):
  - LocalStorage-based access key
  - Top bar logout
  - Reloads on valid password

### 🎨 UI/UX
- Modern, clean styles with emphasis on readability
- Sidebar and layout optimized for wide screens

---

## 🔜 In Progress / Upcoming

### 🟡 UI Enhancements
- Full mobile-responsive adaptation
- Stylish button animations, subtle transitions

### 🟡 New Sections
- 🎮 Additional **Mini Browser Games**
- 📺 Local video library – streaming UI for `.mp4` files
- 👁️‍🗨️ **Watch Tracker** using TMDb API:
  - Movie/TV search
  - Custom watchlists (Watched / Watching / Wishlist)
  - Rating, episode progress

### 🟡 Add-ons & Utilities
- Plugin system for dev tools (e.g. GitHub integration)
- Timeline module (project progression visualization)
- Export / backup support (JSON format)
- Drag-and-drop project uploads

---

## 📌 Ideas & Experiments
- 🎧 Mini music/audio player
- 🎥 Background video header
- 🧩 Public / developer mode switch
- 📱 PWA (Progressive Web App) support

---

## 🚀 Setup & Run

```bash
npm install
npm start
```

---

© 2025 Laurentiu. Built for fun, learning, and showcasing.
