import React, { useState } from 'react';
import '../index.css';

const About = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldpreay"; // from Formspree url

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();

        // Auto-hide after 2 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 2000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      alert("Error sending message: " + err.message);
    }
  };

  return (
    <div>
      {/* About Us Section */}
      <section className="section">
        <h2>About Us</h2>
        <p>
          At <strong>Samvedics</strong>, we are committed to reviving the ancient science of Ayurveda 
          and integrating it into modern lifestyles. Our mission is to provide authentic, 
          natural, and holistic wellness solutions that nurture the mind, body, and soul.
        </p>
        <p>
          Founded with the belief that true health comes from balance, Samvedics 
          combines traditional Ayurvedic wisdom with contemporary wellness practices 
          to offer products you can trust.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="section">
        <h2>Contact Us</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="glass-form" style={{ marginTop: "2rem" }}>
            <input type="text" name="name" placeholder="Your Name" className="glass-input" required />
            <input type="email" name="email" placeholder="Your Email" className="glass-input" required />
            <textarea name="message" placeholder="Your Message" className="glass-textarea" required></textarea>
            <button type="submit" className="glass-button">Send Message</button>
          </form>
        ) : (
          <div className="thankyou-box">
            <p>✅ Thank you for reaching us! We’ll be right back.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default About;
