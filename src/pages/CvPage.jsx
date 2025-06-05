import React from "react";

const CvPage = () => {
  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Curriculum Vitae</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <a
          href="/assets/Laurentiu_cv.pdf"
          download
          style={{
            background: "#1a73e8",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600"
          }}
        >
          ⬇ Download CV
        </a>
      </div>

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)"
      }}>
        <h2>Laurențiu Burducea</h2>
        <p><strong>Location:</strong> Bucharest, Romania</p>

        <h3>Contact</h3>
        <ul>
          <li><strong>Phone:</strong> 0720583526</li>
          <li><strong>Email:</strong> <a href="mailto:blaur1111@gmail.com">blaur1111@gmail.com</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/laurențiu-b-966662197" target="_blank" rel="noreferrer">laurențiu-b</a></li>
        </ul>

        <h3>Summary</h3>
        <p>
          I am a hard working person with a good work ethic and ability to learn quickly.
          I like to challenge myself and I enjoy interacting with others.
        </p>

        <h3>Experience</h3>
        <ul>
          <li><strong>University POLITEHNICA of Bucharest</strong>
            <ul>
              <li><strong>Financial Administrator</strong> – Dec 2023 – Present</li>
              <li><strong>Student Counsellor</strong> – Oct 2022 – Mar 2024</li>
            </ul>
          </li>
          <li><strong>Organizația Studenților Biotehniști</strong> – Graphics & IT Coordinator (Oct 2022 – Nov 2023)</li>
          <li><strong>Freelance (Game Servers & Web)</strong> – Jul 2012 – Sep 2023</li>
          <li><strong>Freelance (Graphic Design)</strong> – Mar 2014 – Nov 2022</li>
        </ul>

        <h3>Education</h3>
        <ul>
          <li><strong>University POLITEHNICA of Bucharest</strong> – Engineer’s degree in Mechatronics (2021–2025)</li>
          <li><strong>Liceul Teoretic Alexandru Marghiloman</strong> – Mathematics & Computer Science (2017–2021)</li>
        </ul>

        <h3>Languages</h3>
        <p>Romanian (Native), English (Full Professional)</p>

        <h3>Certifications</h3>
        <ul>
          <li>English B2 Certificate</li>
          <li>MATLAB Onramp</li>
          <li>Computer Aided Graphics & Descriptive Geometry</li>
          <li>Digital Competence Certificate</li>
        </ul>
      </div>
    </div>
  );
};

export default CvPage;
