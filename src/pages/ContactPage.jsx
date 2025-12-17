import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
      }
      setFormData((prev) => ({ ...prev, file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      alert("Email and message are required.");
      return;
    }

    console.log("Submitted form:", formData);

    setSuccessMessage("✅ Message submitted successfully!");
    setTimeout(() => setSuccessMessage(""), 4000);
    setFormData({ name: "", email: "", message: "", file: null });
  };

  const inputStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "0.0625rem solid #333",
    background: "var(--background-color)",
    color: "var(--on-background-color)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "2.5rem",
        fontFamily: "'Inter', sans-serif",
        background: "var(--background-color)",
        color: "var(--on-background-color)",
        minHeight: "100vh",
        gap: "2.5rem",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Left - Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: "1 1 30rem",
          maxWidth: "37.5rem",
          background: "var(--surface-color)",
          padding: "1.875rem",
          borderRadius: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          border: "0.0625rem solid #333",
        }}
      >
        <h2 style={{ color: "var(--primary-color)", marginBottom: 0 }}>Contact Me</h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: "rgba(3, 218, 198, 0.1)",
              color: "var(--secondary-color)",
              padding: "0.625rem 1rem",
              borderRadius: "0.375rem",
              border: "0.0625rem solid var(--secondary-color)",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            {successMessage}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your name (optional)"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Your email *"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Your message *"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          required
          style={{ ...inputStyle, resize: "vertical", fontFamily: "'Inter', sans-serif" }}
        />

        <div style={{ color: '#aaa', fontSize: '0.9rem' }}>
          <label htmlFor="file">Attach a file (PDF only):</label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            onChange={handleChange}
            style={{ display: 'block', marginTop: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "var(--primary-color)",
            color: "var(--on-primary-color)",
            padding: "0.75rem 0",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "filter 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.filter = "brightness(0.9)")}
          onMouseOut={(e) => (e.target.style.filter = "brightness(1)")}
        >
          Submit
        </button>
      </form>

      {/* Right - Info */}
      <div
        style={{
          flex: "1 1 18.75rem",
          minWidth: "17.5rem",
          maxWidth: "20rem",
          padding: "1.875rem",
          background: "var(--surface-color)",
          borderRadius: "0.75rem",
          border: "0.0625rem solid #333",
          height: "fit-content",
        }}
      >
        <h3 style={{ marginBottom: "0.625rem", color: 'var(--primary-color)' }}>My Info</h3>
        <p>
          <strong>Name:</strong> Laurentiu
        </p>
        <p>
          <strong>Email:</strong> your@email.com
        </p>
        <p>
          <strong>Phone:</strong> +40 700 000 000
        </p>
        <hr style={{ margin: "1.25rem 0", borderColor: "#333" }} />

        <h4 style={{ color: 'var(--primary-color)' }}>Quick Message Links</h4>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", lineHeight: 2 }}>
          <li>
            <a href="https://wa.me/40700000000" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'none'}}>
              📱 WhatsApp
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'none'}}>
              📷 Instagram DM
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'none'}}>
              🔗 LinkedIn
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'none'}}>
              💬 Messenger
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
