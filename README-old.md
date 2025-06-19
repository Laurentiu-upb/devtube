# 🎮 DevTube

A sleek, dynamic developer portfolio styled like **YouTube**.

You can browse your projects like videos, filter by tech stack, search instantly, and open full-screen project pages just like watching a video on YouTube!

---

## 🚀 Features

- 🎥 **Project thumbnails** that look like YouTube video cards
- 🔍 **Live search** by title, description, or stack
- 🌁 **Tag filters** for tech stacks (e.g. `#Python`, `#React`)
- ✨ **Slug-based project pages** (e.g. `/project/smartlauncher`)
- 🖼️ Full-size screenshots / thumbnails in `public/assets/thumbnails`

---

## 📈 Demo

> (Coming soon — GitHub Pages / Vercel deployment planned)

---

## 🛠️ Tech Stack

- **React** (Create React App)
- **React Router DOM** (dynamic routing)
- **JavaScript** + **JSX**
- **HTML/CSS** for layout and inline styles

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx         // Top search bar
│   ├── VideoCard.jsx      // YouTube-style project cards
│   └── ProjectModal.jsx   // (optional) modal fallback
├── pages/
│   └── ProjectPage.jsx    // Dedicated "watch" page for each project
├── data/
│   └── projects.js        // Project metadata with slugs
├── App.js                 // Routing and homepage logic
└── index.js               // React DOM + Router
```

Assets live in:
```
public/assets/thumbnails/
```

---

## ⚡ Quick Start

```bash
git clone https://github.com/Laurentiu-upb/devtube.git
cd devtube
npm install
npm start
```

---

## 🔹 How Routing Works

Project pages use slugs for clean URLs:

- `/project/smartlauncher`
- `/project/varroaclassifier`

Each project in `projects.js` includes a `slug` field like:
```js
slug: "smartlauncher"
```

---

## 🙌 Contributions & Ideas

Feel free to fork and expand:
- Add dark mode
- Deploy live with Vercel
- Add animations
- Fetch projects dynamically

PRs welcome!

---

## 📝 License

[MIT](LICENSE) — free to modify and use in your own portfolio.

---

## 👏 Credits

Inspired by:
- **YouTube** UI
- Dev portfolios with personality
- Real project navigation

---

Built with passion by [Laurentiu](https://github.com/Laurentiu-upb) ❤️
