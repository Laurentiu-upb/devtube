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

    // Simulate success
    setSuccessMessage("✅ Message submitted successfully!");
    setTimeout(() => setSuccessMessage(""), 4000);
    setFormData({ name: "", email: "", message: "", file: null });
  };

  const inputStyle = {
    padding: "10px 12px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
        background: "#f6f9fc",
        minHeight: "100vh",
        gap: "40px",
        justifyContent: "center",
      }}
    >
      {/* Left - Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: "1 1 480px",
          maxWidth: "600px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}
      >
        <h2>Contact Me</h2>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#e6ffed",
              color: "#22863a",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "1px solid #b7eb8f",
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
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <input
          type="file"
          name="file"
          accept=".pdf"
          onChange={handleChange}
          style={{ fontSize: "0.9rem" }}
        />

        <button
          type="submit"
          style={{
            background: "#1a73e8",
            color: "#fff",
            padding: "12px 0",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "background 0.2s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.background = "#1669c1")}
          onMouseOut={(e) => (e.target.style.background = "#1a73e8")}
        >
          Submit
        </button>
      </form>

      {/* Right - Info */}
      <div
        style={{
          flex: "1 1 300px",
          minWidth: "280px",
          maxWidth: "320px",
          padding: "30px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          height: "fit-content",
          position: "sticky",
          top: 20,
        }}
      >
        <h3 style={{ marginBottom: 10 }}>My Info</h3>
        <p>
          <strong>Name:</strong> Laurentiu
        </p>
        <p>
          <strong>Email:</strong> your@email.com
        </p>
        <p>
          <strong>Phone:</strong> +40 700 000 000
        </p>
        <hr style={{ margin: "20px 0" }} />

        <h4>Quick Message Links</h4>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem" }}>
          <li>
            <a href="https://wa.me/40700000000" target="_blank" rel="noreferrer">
              📱 WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/direct/t/yourusername"
              target="_blank"
              rel="noreferrer"
            >
              📷 Instagram DM
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
              🔗 LinkedIn
            </a>
          </li>
          <li>
            <a href="https://m.me/yourusername" target="_blank" rel="noreferrer">
              💬 Messenger
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
