import React from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects';

const CategoriesPage = () => {
  const categories = [...new Set(projects.map(p => p.type))];

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: 'var(--primary-color)' }}>Project Categories</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
        gap: "2rem",
        marginTop: "2rem"
      }}>
        {categories.map(category => (
          <Link to={`/categories/${category}`} key={category} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <div style={{
              background: 'var(--surface-color)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              textAlign: 'center',
              border: '1px solid #333',
              transition: 'all 0.2s ease',
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
              <h2 style={{ color: 'var(--primary-color)' }}>{category}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
