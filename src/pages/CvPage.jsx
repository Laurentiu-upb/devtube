import React from "react";

const CvPage = () => {
  const sectionStyle = {
    marginBottom: "1.5rem",
    paddingBottom: "1.5rem",
    borderBottom: "0.0625rem solid #333"
  };

  const h3Style = {
    color: "var(--primary-color)",
    marginBottom: "0.75rem",
    fontSize: "1.2rem"
  };

  return (
    <div style={{
      padding: "2.5rem",
      fontFamily: "'Inter', sans-serif",
      background: "var(--background-color)",
      color: "var(--on-background-color)",
      minHeight: "100vh"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.875rem", color: "var(--primary-color)" }}>Curriculum Vitae</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.875rem" }}>
        <a
          href="/assets/Laurentiu_cv.pdf"
          download
          style={{
            background: "var(--primary-color)",
            color: "var(--on-primary-color)",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontWeight: "600",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "filter 0.2s"
          }}
          onMouseOver={(e) => (e.target.style.filter = "brightness(0.9)")}
          onMouseOut={(e) => (e.target.style.filter = "brightness(1)")}
        >
          <span style={{ fontSize: '1.2rem' }}>⬇</span> Download CV
        </a>
      </div>

      <div style={{
        maxWidth: "56.25rem",
        margin: "0 auto",
        background: "var(--surface-color)",
        padding: "2.5rem",
        borderRadius: "0.75rem",
        border: "0.0625rem solid #333"
      }}>
        <div style={{...sectionStyle, borderBottom: 'none', textAlign: 'center'}}>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Laurențiu Burducea</h2>
            <p style={{ color: "#aaa", fontSize: '1rem' }}>Bucharest, Romania</p>
        </div>

        <div style={sectionStyle}>
          <h3 style={h3Style}>Contact</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><strong>Phone:</strong> 0720583526</li>
            <li><strong>Email:</strong> <a href="mailto:blaur1111@gmail.com" style={{ color: "var(--secondary-color)" }}>blaur1111@gmail.com</a></li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/laurențiu-b-966662197" target="_blank" rel="noreferrer" style={{ color: "var(--secondary-color)" }}>linkedin.com/in/laurențiu-b</a></li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h3 style={h3Style}>Summary</h3>
          <p style={{ lineHeight: 1.6, color: '#ccc' }}>
            I am a hard working person with a good work ethic and ability to learn quickly.
            I like to challenge myself and I enjoy interacting with others.
          </p>
        </div>

        <div style={sectionStyle}>
          <h3 style={h3Style}>Experience</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.8 }}>
            <li><strong>University POLITEHNICA of Bucharest</strong>
              <ul style={{ listStyle: 'circle inside', paddingLeft: "1.25rem", color: '#ccc' }}>
                <li><strong>Financial Administrator</strong> – Dec 2023 – Present</li>
                <li><strong>Student Counsellor</strong> – Oct 2022 – Mar 2024</li>
              </ul>
            </li>
            <li style={{ marginTop: "0.75rem" }}><strong>Organizația Studenților Biotehniști</strong> – Graphics & IT Coordinator (Oct 2022 – Nov 2023)</li>
            <li style={{ marginTop: "0.75rem" }}><strong>Freelance (Game Servers & Web)</strong> – Jul 2012 – Sep 2023</li>
            <li style={{ marginTop: "0.75rem" }}><strong>Freelance (Graphic Design)</strong> – Mar 2014 – Nov 2022</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h3 style={h3Style}>Education</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.8 }}>
            <li><strong>University POLITEHNICA of Bucharest</strong> – Engineer’s degree in Mechatronics (2021–2025)</li>
            <li style={{ marginTop: "0.75rem" }}><strong>Liceul Teoretic Alexandru Marghiloman</strong> – Mathematics & Computer Science (2017–2021)</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h3 style={h3Style}>Languages</h3>
          <p style={{ color: '#ccc' }}>Romanian (Native), English (Full Professional)</p>
        </div>

        <div style={{...sectionStyle, borderBottom: 'none'}}>
          <h3 style={h3Style}>Certifications</h3>
          <ul style={{ listStyle: 'disc inside', padding: 0, color: '#ccc', lineHeight: 1.8 }}>
            <li>English B2 Certificate</li>
            <li>MATLAB Onramp</li>
            <li>Computer Aided Graphics & Descriptive Geometry</li>
            <li>Digital Competence Certificate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CvPage;
