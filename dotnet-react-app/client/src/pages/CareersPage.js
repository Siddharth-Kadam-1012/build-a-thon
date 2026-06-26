import React, { useState, useEffect } from 'react';
import '../App.css';

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const imgHero = 'https://www.figma.com/api/mcp/asset/a4434b10-cc0e-4879-b86a-2a33104d8bd8';

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="careers-hero-section" data-testid="hero-section">
      <div className="careers-hero-content">
        <h1 className="careers-hero-heading" data-testid="hero-heading">
          Welcome to <span className="accent-text">YourBank</span> Careers!
        </h1>
        <p className="careers-hero-description" data-testid="hero-description">
          Join our team and embark on a rewarding journey in the banking industry. At YourBank, 
          we are committed to fostering a culture of excellence and providing opportunities for 
          professional growth. With a focus on innovation, customer service, and integrity, we 
          strive to make a positive impact in the lives of our customers and communities. Join 
          us today and be a part of our mission to shape the future of banking.
        </p>
      </div>
      <div className="careers-hero-image" data-testid="hero-image">
        <img src={imgHero} alt="YourBank Team" />
      </div>
    </section>
  );
}

// ─── Our Values ────────────────────────────────────────────────────────────────
const values = [
  { title: 'Integrity', desc: 'We conduct ourselves with utmost honesty, transparency, and ethical behavior. We believe in doing what is right for our customers, colleagues, and stakeholders, even when faced with difficult choices.' },
  { title: 'Customer Centricity', desc: 'Our customers are at the heart of everything we do. We are dedicated to understanding their needs, providing personalized solutions, and delivering exceptional service that exceeds expectations.' },
  { title: 'Collaboration', desc: 'We foster a collaborative and inclusive work environment, where teamwork and diversity are celebrated. By leveraging the unique strengths and perspectives of our employees, we drive innovation and achieve greater success together.' },
  { title: 'Innovation', desc: 'We embrace change and constantly seek innovative solutions to meet the evolving needs of our customers. We encourage our employees to think creatively, challenge conventions, and explore new ideas to drive the future of banking.' },
];

function ValuesSection() {
  return (
    <section id="values" className="section values-section" data-testid="values-section">
      <div className="section-header-solo">
        <h2 className="section-heading">
          Our <span className="accent-text">Values</span>
        </h2>
        <p className="section-description">
          At YourBank, our values form the foundation of our organization and guide our actions. 
          We believe in upholding the highest standards of integrity, delivering exceptional service, 
          and embracing innovation. These values define our culture and shape the way we work together 
          to achieve our goals.
        </p>
      </div>
      <div className="values-grid" data-testid="values-grid">
        {values.map((v, i) => (
          <div key={i} className="value-card" data-testid={`value-card-${i}`}>
            <h3 className="value-title">{v.title}</h3>
            <p className="value-desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Our Benefits ──────────────────────────────────────────────────────────────
const benefits = [
  { icon: '💰', title: 'Competitive Compensation', desc: 'We provide a competitive salary package that recognizes the skills and expertise of our employees. YourBank believes in rewarding exceptional performance and offering opportunities for financial growth.' },
  { icon: '🏥', title: 'Health and Wellness', desc: 'We prioritize the health and well-being of our employees by providing comprehensive medical, dental, and vision insurance plans. We also offer wellness programs, gym memberships, and resources to support a healthy lifestyle.' },
  { icon: '💼', title: 'Retirement Planning', desc: 'YourBank is committed to helping employees plan for their future. We offer a retirement savings plan with a generous employer match to help them build a secure financial foundation for the long term.' },
  { icon: '⚖️', title: 'Work-Life Balance', desc: 'We understand the importance of maintaining a healthy work-life balance. YourBank offers flexible work arrangements, paid time off, parental leave, and other programs that support employees in managing their personal and professional commitments.' },
];

function BenefitsSection() {
  return (
    <section id="benefits" className="section benefits-section" data-testid="benefits-section">
      <div className="section-header-solo">
        <h2 className="section-heading">
          Our <span className="accent-text">Benefits</span>
        </h2>
        <p className="section-description">
          At YourBank, we value our employees and are dedicated to their well-being and success. 
          We offer a comprehensive range of benefits designed to support their personal and 
          professional growth.
        </p>
      </div>
      <div className="benefits-grid" data-testid="benefits-grid">
        {benefits.map((b, i) => (
          <div key={i} className="benefit-card" data-testid={`benefit-card-${i}`}>
            <div className="benefit-icon">{b.icon}</div>
            <h3 className="benefit-title">{b.title}</h3>
            <p className="benefit-desc">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Job Openings ──────────────────────────────────────────────────────────────
function JobOpeningsSection({ jobs, loading, error }) {
  return (
    <section id="jobs" className="section jobs-section" data-testid="jobs-section">
      <div className="section-header-solo">
        <h2 className="section-heading">
          <span className="accent-text">Job Openings</span>
        </h2>
        <p className="section-description">
          Explore exciting job openings at YourBank, where we value talent, innovation, and a 
          passion for customer service. Join our team and be part of shaping a brighter future 
          in the banking industry.
        </p>
      </div>
      {loading ? (
        <div className="jobs-grid" data-testid="jobs-grid">
          <p>Loading job openings...</p>
        </div>
      ) : error ? (
        <div className="jobs-grid" data-testid="jobs-grid">
          <p>Error loading jobs: {error}</p>
        </div>
      ) : (
        <div className="jobs-grid" data-testid="jobs-grid">
          {jobs.map((job, i) => (
            <div key={job.id || i} className="job-card" data-testid={`job-card-${i}`}>
              <div className="job-card-header">
                <h3 className="job-title" data-testid={`job-title-${i}`}>{job.title}</h3>
                <div className="job-tags">
                  <span className="job-tag" data-testid={`job-location-${i}`}>Location: {job.location}</span>
                  <span className="job-tag" data-testid={`job-department-${i}`}>Department: {job.department}</span>
                </div>
              </div>
              <div className="job-card-content">
                <div className="job-section">
                  <h4 className="job-section-title">About This Job</h4>
                  <p className="job-description">{job.about}</p>
                </div>
                <div className="job-section">
                  <h4 className="job-section-title">Requirements & Qualifications</h4>
                  <ul className="job-requirements" data-testid={`job-requirements-${i}`}>
                    {job.requirements && job.requirements.map((req, j) => (
                      <li key={j}><span>💼</span> {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="btn-primary-accent" data-testid={`apply-btn-${i}`}>Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How do I open an account with YourBank?', a: 'Opening an account with YourBank is easy. Simply visit our website and click on the "Open an Account" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.' },
  { q: 'What documents do I need to provide to apply for a loan?', a: "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process." },
  { q: 'How can I access my accounts online?', a: 'Accessing your accounts online is simple and secure. Visit our website and click on the "Login" button. Enter your username and password to access your accounts. If you haven\'t registered for online banking, click on the "Enroll Now" button and follow the registration process. If you need assistance, our customer support team is available to guide you.' },
  { q: 'Are my transactions and personal information secure?', a: 'At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.' },
];

function FAQSection() {
  return (
    <section id="faq" className="section faq-section" data-testid="faq-section">
      <div className="section-header-solo">
        <h2 className="section-heading">
          <span className="accent-text">Frequently</span> Asked Questions
        </h2>
        <p className="section-description">
          Still you have any questions? Contact our Team via support@yourbank.com
        </p>
      </div>
      <div className="faq-grid" data-testid="faq-grid">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item" data-testid={`faq-item-${i}`}>
            <h4 className="faq-question">{faq.q}</h4>
            <div className="faq-divider" />
            <p className="faq-answer">{faq.a}</p>
          </div>
        ))}
      </div>
      <button className="btn-outline" data-testid="load-all-faq-btn">Load All FAQ's</button>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="section cta-section" data-testid="cta-section">
      <div className="cta-content">
        <h2 className="cta-heading">
          Start your Career with <span className="accent-text">YourBank</span> today!
        </h2>
        <p className="cta-description">
          Lorem ipsum dolor sit amet consectetur. Blandit odio semper risus pellentesque elit. 
          Pellentesque eget ut imperdiet nulla penatibus. Nascetur viverra arcu sed amet cursus purus.
        </p>
      </div>
      <button className="btn-primary-accent" data-testid="cta-open-account-btn">Open Account</button>
    </section>
  );
}

// ─── Careers Page ──────────────────────────────────────────────────────────────
function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched jobs data:', data);
        console.log('First job:', data[0]);
        setJobs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <HeroSection />
      <ValuesSection />
      <BenefitsSection />
      <JobOpeningsSection jobs={jobs} loading={loading} error={error} />
      <FAQSection />
      <CTASection />
    </>
  );
}

export default CareersPage;
