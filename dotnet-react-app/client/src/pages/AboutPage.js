import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const API_BASE_URL = 'http://localhost:5000/api';

// Image URLs from Figma
const imgHeroImage = 'https://www.figma.com/api/mcp/asset/bd8f6a59-9fa8-49c1-b327-c4cc23fa1edb';
const imgMissionImage = 'https://www.figma.com/api/mcp/asset/a4419344-af9a-4ee9-9c0c-b76379c9b0bc';
const imgVisionImage = 'https://www.figma.com/api/mcp/asset/e9faedb6-497b-4375-a96b-449d2f2b709c';

// Fallback data matching the API seed data
const FALLBACK_PRESS_RELEASES = [
  {
    id: 1,
    title: "YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
    location: "India",
    date: "06/11/2024",
    description: "YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to delivering exceptional value and building lasting relationships with our valued customers.",
    imageUrl: "https://www.figma.com/api/mcp/asset/26d2235f-e716-42a8-926d-89776c3c2962"
  },
  {
    id: 2,
    title: "YourBank Expands Branch Network with Opening of New Location in Chennai",
    location: "India",
    date: "12/11/2024",
    description: "YourBank is excited to announce the grand opening of our newest branch in [City]. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking, further strengthening our presence in the local community.",
    imageUrl: "https://www.figma.com/api/mcp/asset/6100fb44-7ca6-4bc6-a1e6-d1a18eaeedb3"
  },
  {
    id: 3,
    title: "YourBank Partners with Local Nonprofit to Support Financial Education Initiatives",
    location: "India",
    date: "24/12/2024",
    description: "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.",
    imageUrl: "https://www.figma.com/api/mcp/asset/b7ffe55e-076f-41ba-808a-98cc9d78c4ff"
  },
  {
    id: 4,
    title: "YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility",
    location: "India",
    date: "28/12/2024",
    description: "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.",
    imageUrl: "https://www.figma.com/api/mcp/asset/c77d69b3-0dea-4d70-954f-178e18af6c82"
  }
];

// ─── Hero Section ──────────────────────────────────────────────────────────────
function AboutHeroSection() {
  return (
    <section className="about-hero-section" data-testid="about-hero-section">
      <div className="about-hero-content" data-testid="about-hero-content">
        <p className="about-hero-eyebrow" data-testid="about-hero-eyebrow">Welcome to YourBank</p>
        <h1 className="about-hero-heading" data-testid="about-hero-heading">
          Where Banking Meets <span className="accent-text">Excellence!</span>
        </h1>
        <p className="about-hero-description" data-testid="about-hero-description">
          At YourBank, we believe that banking should be more than just transactions. It should be an experience that empowers individuals and businesses to thrive and reach their financial goals. As a trusted financial institution, we are committed to delivering exceptional banking services that go beyond expectations. With a focus on innovation, personalized solutions, and unwavering integrity, we strive to provide the best banking experience for our valued customers. Join us on this exciting journey and discover a new level of banking excellence.
        </p>
      </div>
      <div className="about-hero-image-container" data-testid="about-hero-image">
        <img src={imgHeroImage} alt="Banking Excellence" className="about-hero-image" />
      </div>
    </section>
  );
}

// ─── Mission & Vision Section ───────────────────────────────────────────────
function MissionVisionSection() {
  return (
    <section className="mission-vision-section" data-testid="mission-vision-section">
      <div className="section-header-text" data-testid="mission-vision-header">
        <h2 className="section-heading" data-testid="mission-vision-heading">Mission & Vision</h2>
        <p className="section-sub" data-testid="mission-vision-sub">
          We envision being a leading force in the industry, driven by innovation, integrity, and inclusivity, creating a brighter financial future for individuals and businesses while maintaining a strong commitment to customer satisfaction and community development
        </p>
      </div>

      <div className="mission-vision-content">
        {/* Mission */}
        <div className="mission-container" data-testid="mission-container">
          <div className="mission-image-box" data-testid="mission-image-box">
            <img src={imgMissionImage} alt="Mission" className="mission-vision-image" />
          </div>
          <div className="mission-text" data-testid="mission-text">
            <h3 className="mission-vision-title" data-testid="mission-title">Mission</h3>
            <p className="mission-vision-description" data-testid="mission-description">
              At YourBank, our mission is to empower our customers to achieve financial success. We are dedicated to delivering innovative banking solutions that cater to their unique needs. Through personalized services, expert guidance, and cutting-edge technology, we aim to build strong, lasting relationships with our customers. Our mission is to be their trusted partner, helping them navigate their financial journey and realize their dreams.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="vision-container" data-testid="vision-container">
          <div className="vision-text" data-testid="vision-text">
            <h3 className="mission-vision-title" data-testid="vision-title">Vision</h3>
            <p className="mission-vision-description" data-testid="vision-description">
              Our vision at YourBank is to redefine banking by creating a seamless and personalized experience for our customers. We envision a future where banking is accessible, transparent, and tailored to individual preferences. Through continuous innovation and collaboration, we strive to be at the forefront of the industry, setting new standards for customer-centric banking. Our vision is to be the preferred financial institution, known for our unwavering commitment to excellence, trust, and customer satisfaction.
            </p>
          </div>
          <div className="vision-image-box" data-testid="vision-image-box">
            <img src={imgVisionImage} alt="Vision" className="mission-vision-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Press Releases Section ─────────────────────────────────────────────────
function PressReleasesSection() {
  const [pressReleases, setPressReleases] = useState(FALLBACK_PRESS_RELEASES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pressreleases`);
        setPressReleases(response.data);
        setLoading(false);
      } catch (err) {
        console.warn('API not available, using fallback data:', err.message);
        // Keep fallback data, mark as loaded
        setLoading(false);
        // Don't show error to user, just use fallback
      }
    };

    fetchPressReleases();
  }, []);

  return (
    <section className="press-releases-section" data-testid="press-releases-section">
      <div className="section-header-text" data-testid="press-releases-header">
        <h2 className="section-heading" data-testid="press-releases-heading">Press Releases</h2>
        <p className="section-sub" data-testid="press-releases-sub">
          Stay updated with the latest happenings and exciting developments at YourBank through our press releases.
        </p>
      </div>

      {loading && <p className="loading-text" data-testid="loading-text">Loading press releases...</p>}
      
      <div className="press-releases-grid" data-testid="press-releases-grid">
        {pressReleases.map((release, index) => (
          <article 
            key={release.id} 
            className="press-release-card" 
            data-testid={`press-release-card-${index}`}
          >
            <div className="press-release-image-container" data-testid={`press-release-image-${index}`}>
              <img 
                src={release.imageUrl} 
                alt={release.title} 
                className="press-release-image"
              />
            </div>
            <div className="press-release-content">
              <h3 className="press-release-title" data-testid={`press-release-title-${index}`}>
                {release.title}
              </h3>
              <div className="press-release-meta" data-testid={`press-release-meta-${index}`}>
                <span className="press-release-badge" data-testid={`press-release-location-${index}`}>
                  Location: {release.location}
                </span>
                <span className="press-release-badge" data-testid={`press-release-date-${index}`}>
                  Date: {release.date}
                </span>
              </div>
              <p className="press-release-description" data-testid={`press-release-description-${index}`}>
                {release.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Main About Page ────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="about-page" data-testid="about-page">
      <AboutHeroSection />
      <MissionVisionSection />
      <PressReleasesSection />
    </div>
  );
}

export default AboutPage;
