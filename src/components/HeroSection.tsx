import React, { useState, ChangeEvent } from 'react';
import nban from "@/assets/newban.jpeg";

const HeroSection: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>(nban);
  const [title, setTitle] = useState<string>('Natual Rudraksha');
  const [titleAccent, setTitleAccent] = useState<string>('Authentic Rudraksha Beads for Spiritual Protection, Inner Peace & Divine Energy');
  const [bodyText, setBodyText] = useState<string>(
    'Rudraksha beads are ideal for meditation, healing, and daily wear. Worn for centuries by sages and seekers, Rudraksha helps align mind, body, and soul while attracting peace, prosperity, and positive energy.'
  );

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBackgroundImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --color-primary: #8B7355;
          --color-accent: #D4AF37;
          --color-dark: #2C2416;
          --color-light: #F5F3EF;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--color-dark);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: subtleZoom 20s ease-in-out infinite alternate;
        }

        @keyframes subtleZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(44, 36, 22, 0.75) 0%,
            rgba(44, 36, 22, 0.45) 50%,
            rgba(44, 36, 22, 0.7) 100%
          );
          z-index: 2;
        }

        .hero-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 20% 50%,
            rgba(212, 175, 55, 0.08) 0%,
            transparent 50%
          );
          animation: pulseGlow 8s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .hero-content {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          padding: 2rem;
          text-align: center;
          animation: fadeInUp 1.2s ease-out;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-accent {
          width: 80px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-accent),
            transparent
          );
          margin: 0 auto 2rem;
          animation: expandLine 1s ease-out 0.3s backwards;
        }

        @keyframes expandLine {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 80px;
            opacity: 1;
          }
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          font-weight: 300;
          color: var(--color-light);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1.2s ease-out 0.2s backwards;
        }

        .hero-title-text {
          display: block;
        }

        .hero-title-accent {
          display: block;
          font-weight: 600;
          background: linear-gradient(
            135deg,
            var(--color-accent) 0%,
            #F4E4C1 50%,
            var(--color-accent) 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-body {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 300;
          color: var(--color-light);
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 2.5rem;
          letter-spacing: 0.03em;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
          animation: fadeInUp 1.2s ease-out 0.4s backwards;
          opacity: 0.95;
        }

        .hero-cta {
          display: inline-block;
          padding: 1rem 2.5rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-dark);
          background: var(--color-accent);
          border: 2px solid var(--color-accent);
          border-radius: 0;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 1.2s ease-out 0.6s backwards;
          cursor: pointer;
        }

        .hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--color-light);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .hero-cta:hover {
          color: var(--color-dark);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
        }

        .hero-cta:hover::before {
          left: 0;
        }

        .corner-ornament {
          position: absolute;
          width: 100px;
          height: 100px;
          z-index: 4;
          opacity: 0.3;
        }

        .corner-ornament.top-left {
          top: 2rem;
          left: 2rem;
          border-top: 2px solid var(--color-accent);
          border-left: 2px solid var(--color-accent);
          animation: drawCorner 1.5s ease-out;
        }

        .corner-ornament.bottom-right {
          bottom: 2rem;
          right: 2rem;
          border-bottom: 2px solid var(--color-accent);
          border-right: 2px solid var(--color-accent);
          animation: drawCorner 1.5s ease-out 0.3s backwards;
        }

        @keyframes drawCorner {
          0% {
            width: 0;
            height: 0;
          }
          50% {
            width: 100px;
            height: 0;
          }
          100% {
            width: 100px;
            height: 100px;
          }
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          animation: fadeIn 1.5s ease-out 1s backwards, bounce 2s ease-in-out 2s infinite;
        }

        .scroll-indicator::before {
          content: '';
          display: block;
          width: 30px;
          height: 50px;
          border: 2px solid var(--color-accent);
          border-radius: 20px;
          position: relative;
        }

        .scroll-indicator::after {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--color-accent);
          border-radius: 50%;
          animation: scrollDot 2s ease-in-out infinite;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.7;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        @keyframes scrollDot {
          0% {
            top: 8px;
            opacity: 1;
          }
          50% {
            top: 30px;
            opacity: 0.3;
          }
          100% {
            top: 8px;
            opacity: 1;
          }
        }

        .upload-controls {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .upload-controls h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--color-dark);
        }

        .upload-controls input[type="file"] {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .upload-controls input[type="text"],
        .upload-controls textarea {
          width: 100%;
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: 'Montserrat', sans-serif;
        }

        .upload-controls textarea {
          min-height: 80px;
          resize: vertical;
        }

        .upload-controls label {
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-dark);
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 1.5rem;
          }

          .hero-title {
            margin-bottom: 1rem;
          }

          .hero-body {
            margin-bottom: 2rem;
          }

          .corner-ornament {
            width: 60px;
            height: 60px;
          }

          .corner-ornament.top-left {
            top: 1rem;
            left: 1rem;
          }

          .corner-ornament.bottom-right {
            bottom: 1rem;
            right: 1rem;
          }

          @keyframes drawCorner {
            0% {
              width: 0;
              height: 0;
            }
            50% {
              width: 60px;
              height: 0;
            }
            100% {
              width: 60px;
              height: 60px;
            }
          }
        }
      `}</style>

      {/* Upload Controls */}
      <div className="upload-controls">
        <h3>Customize Hero</h3>
        <label htmlFor="bgImage">Background Image:</label>
        <input
          type="file"
          id="bgImage"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <label htmlFor="heroTitle">Title:</label>
        <input
          type="text"
          id="heroTitle"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="heroTitleAccent">Title Accent (second line):</label>
        <input
          type="text"
          id="heroTitleAccent"
          placeholder="Accent text"
          value={titleAccent}
          onChange={(e) => setTitleAccent(e.target.value)}
        />

        <label htmlFor="heroBody">Body Text:</label>
        <textarea
          id="heroBody"
          placeholder="Enter body text"
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
        />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Image */}
        <div className="hero-background">
          <img src={backgroundImage} alt="Hero Background" />
        </div>

        {/* Overlay */}
        <div className="hero-overlay"></div>

        {/* Decorative Corners */}
        <div className="corner-ornament top-left"></div>
        <div className="corner-ornament bottom-right"></div>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-accent"></div>
          <h1 className="hero-title">
            <span className="hero-title-text">{title}</span>
            <span className="hero-title-accent">{titleAccent}</span>
          </h1>
          <p className="hero-body">{bodyText}</p>
          <a href="#" className="hero-cta">
            Explore Collection
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator"></div>
      </section>
    </>
  );
};

export default HeroSection;