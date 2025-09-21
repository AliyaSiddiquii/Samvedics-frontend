import React from 'react';
import '../index.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section with Leaves */}
      <div className="homepage-container">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
        <div className="leaf leaf4"></div>
        <div className="leaf leaf5"></div>
        <div className="leaf leaf6"></div>
        <div className="leaf leaf7"></div>
        <div className="leaf leaf8"></div>
        <div className="leaf leaf9"></div>
        <div className="leaf leaf10"></div>

        <div className="homepage-content">
          <h1 className="homepage-title">Welcome to Samvedics</h1>
          <p className="homepage-description">
            Your one-stop shop for authentic Ayurvedic products,
            crafted with care for your health and wellness.
          </p>
        </div>
      </div>

      {/* Benefits of Ayurveda */}
      <section className="section">
        <h2>Benefits of Ayurveda</h2>
        <p>
          Ayurveda offers holistic healing by balancing the body, mind, and soul. 
          Its natural approach has stood the test of time for thousands of years.
        </p>
        <div className="benefits-grid">
          <div className="benefit-card">🌿 Improves Immunity and Vitality</div>
          <div className="benefit-card">🧘 Promotes Mental Peace & Stress Relief</div>
          <div className="benefit-card">🍃 Natural Remedies without Side Effects</div>
          <div className="benefit-card">⚡ Restores Energy & Longevity</div>
        </div>
      </section>

      {/* History of Ayurveda */}
      <section className="section">
        <h2>History of Ayurveda</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>5000+ Years Ago</h3>
              <p>
                Ayurveda originated in India, deeply rooted in Vedic traditions, 
                focusing on natural healing and balance.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>Charaka & Sushruta Samhita</h3>
              <p>
                Foundational Ayurvedic texts were written, detailing surgery, 
                herbs, and holistic medicine.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h3>Modern Era</h3>
              <p>
                Ayurveda continues to thrive globally, blending ancient wisdom 
                with modern wellness practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        All rights reserved © Samvedics | Design by Aliya Siddiqui
      </footer>
    </div>
  );
};

export default Home;
