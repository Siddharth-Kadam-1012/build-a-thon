import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const API_BASE_URL = 'http://localhost:5000/api';

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="hero-section" data-testid="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot">✦</span>
          <span>No LLC Fees, No Minimums</span>
        </div>
        <h1 className="hero-heading">
          Welcome to YourBank<br />
          <span className="hero-accent">Empowering Your Financial Journey</span>
        </h1>
        <p className="hero-description">
          At YourBank, our mission is to provide comprehensive banking solutions
          that empower individuals and businesses to achieve their financial goals.
          Join us today and experience banking that works for you.
        </p>
        <button className="btn-primary-accent" data-testid="hero-learn-more">
          Learn More
        </button>
      </div>
      <div className="hero-visual" data-testid="hero-card">
        <div className="bank-card">
          <div className="bank-card-header">
            <div className="card-chip" />
            <span className="card-brand">◈ YourBank</span>
          </div>
          <div className="card-number">**** **** **** 4291</div>
          <div className="card-footer-row">
            <div>
              <div className="card-label">Card Holder</div>
              <div className="card-value">Alex Johnson</div>
            </div>
            <div>
              <div className="card-label">Expires</div>
              <div className="card-value">12/28</div>
            </div>
          </div>
        </div>
        <div className="hero-stats-row">
          <div className="hero-stat-box">
            <div className="stat-number">$12,500</div>
            <div className="stat-label">Total Balance</div>
          </div>
          <div className="hero-stat-box">
            <div className="stat-number">+2.4%</div>
            <div className="stat-label">Growth</div>
          </div>
          <div className="hero-stat-box">
            <div className="stat-number">24</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products ──────────────────────────────────────────────────────────────────
const bankingProducts = [
  {
    icon: '🏦',
    title: 'Banking Accounts',
    description:
      'YourBank offers a range of flexible and rewarding checking accounts designed to suit your unique financial needs.',
    category: 'Personal',
  },
  {
    icon: '💰',
    title: 'Savings Accounts',
    description:
      'YourBank provides high-yield savings accounts designed to grow your wealth while keeping your money secure and accessible.',
    category: 'Personal',
  },
  {
    icon: '🏠',
    title: 'Loans and Mortgages',
    description:
      'YourBank provides flexible loan and mortgage options to help you achieve your dream home or fund major life events.',
    category: 'Lending',
  },
];

function ProductsSection({ apiProducts, loading }) {
  const displayProducts = apiProducts.length > 0
    ? apiProducts.slice(0, 3).map((p) => ({
        icon: '📦',
        title: p.name,
        description: `Category: ${p.category} — Price: $${p.price.toFixed(2)}`,
        category: p.category,
      }))
    : bankingProducts;

  return (
    <section id="products" className="section products-section" data-testid="products-section">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Our Products</p>
          <h2 className="section-heading">
            Explore Our Range of<br />Financial Products
          </h2>
        </div>
        <button className="btn-outline" data-testid="learn-all-products">Learn More</button>
      </div>
      <p className="section-sub">
        YourBank — a large financial institution with an extensive portfolio of products
        and services, and a commitment to excellent customer experience.
      </p>
      {loading ? (
        <div className="loading-indicator">Loading products…</div>
      ) : (
        <div className="products-grid" data-testid="products-list">
          {displayProducts.map((p, i) => (
            <div key={i} className="product-card" data-testid={`product-card-${i}`}>
              <div className="product-card-icon">{p.icon}</div>
              <h3 className="product-card-title">{p.title}</h3>
              <p className="product-card-desc">{p.description}</p>
              <button className="btn-link">Learn More →</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Use Cases ─────────────────────────────────────────────────────────────────
function UseCasesSection() {
  const [tab, setTab] = useState('individuals');
  return (
    <section id="use-cases" className="section use-cases-section" data-testid="use-cases-section">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Use Cases</p>
          <h2 className="section-heading">Solutions for Every Financial Need</h2>
        </div>
      </div>
      <div className="tabs" data-testid="use-cases-tabs">
        <button
          className={`tab-btn ${tab === 'individuals' ? 'active' : ''}`}
          onClick={() => setTab('individuals')}
          data-testid="tab-individuals"
        >For Individuals</button>
        <button
          className={`tab-btn ${tab === 'business' ? 'active' : ''}`}
          onClick={() => setTab('business')}
          data-testid="tab-business"
        >For Business</button>
      </div>
      {tab === 'individuals' && (
        <div className="use-cases-content" data-testid="individuals-content">
          <div className="use-cases-left">
            <p>
              For individuals, YourBank offers tailored financial services that cater
              to your personal goals — from everyday banking to long-term wealth planning.
            </p>
            <div className="use-case-cards">
              {['Managing Personal Finances','Saving for the Future','Performance App','Education Funding'].map((t, i) => (
                <div key={i} className="use-case-card" data-testid={`use-case-${i}`}>
                  <span className="use-case-icon">◆</span> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="use-cases-right">
            <div className="stats-grid">
              <div className="stat-item" data-testid="stat-0"><div className="stat-val">78%</div><div className="stat-label-sm">Satisfaction<br/>Rate</div></div>
              <div className="stat-item" data-testid="stat-1"><div className="stat-val">63%</div><div className="stat-label-sm">Active<br/>Users</div></div>
              <div className="stat-item" data-testid="stat-2"><div className="stat-val">91%</div><div className="stat-label-sm">Goal<br/>Achievement</div></div>
            </div>
            <button className="btn-link">Learn More →</button>
          </div>
        </div>
      )}
      {tab === 'business' && (
        <div className="use-cases-content" data-testid="business-content">
          <div className="use-cases-left">
            <p>
              For businesses, YourBank provides comprehensive financial tools to manage
              cash flow, access credit, and drive sustainable growth.
            </p>
            <div className="use-case-cards">
              {['Cash Flow Management','Business Expansion','Payroll Solutions','Tax & Accounting'].map((t, i) => (
                <div key={i} className="use-case-card" data-testid={`biz-case-${i}`}>
                  <span className="use-case-icon">◆</span> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="use-cases-right">
            <div className="stats-grid">
              <div className="stat-item"><div className="stat-val">65%</div><div className="stat-label-sm">Business<br/>Growth</div></div>
              <div className="stat-item"><div className="stat-val">70%</div><div className="stat-label-sm">Revenue<br/>Increase</div></div>
              <div className="stat-item"><div className="stat-val">45%</div><div className="stat-label-sm">Cost<br/>Reduction</div></div>
            </div>
            <button className="btn-link">Learn More →</button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────
const features = [
  { icon: '🔒', title: 'Smart Security', desc: 'Advanced encryption and multi-factor authentication keep your accounts safe 24/7.' },
  { icon: '🕐', title: '24/7 Account Access', desc: 'Access your accounts anytime, anywhere through our mobile app or web platform.' },
  { icon: '📱', title: 'Mobile Banking App', desc: 'Our intuitive app puts complete banking power in the palm of your hand.' },
  { icon: '🔑', title: 'Secure Transactions', desc: 'Every transaction is protected with bank-grade security and fraud detection.' },
  { icon: '💳', title: 'Bill Pay & Transfers', desc: 'Pay bills and transfer funds instantly with zero hidden fees.' },
  { icon: '🎧', title: 'Customer Support', desc: '24/7 expert support available via chat, phone, or video call.' },
];

function FeaturesSection() {
  return (
    <section id="features" className="section features-section" data-testid="features-section">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Our Features</p>
          <h2 className="section-heading">Packed with Powerful Features</h2>
        </div>
      </div>
      <p className="section-sub">
        YourBank is a powerful, feature-rich platform with a commitment to excellent
        customer experience that you can customise to your preferences.
      </p>
      <div className="features-grid" data-testid="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card" data-testid={`feature-card-${i}`}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How do I open a special account with YourBank?', a: 'Opening an account is simple. Visit our website, click "Open Account", and follow the step-by-step process. You\'ll need a valid ID and a few minutes to complete the digital form.' },
  { q: 'What documents do I need to apply for credit?', a: 'To apply for credit, you will need a government-issued photo ID, proof of income (pay stubs or tax returns), and your social security number. Additional documents may be requested based on your application.' },
  { q: 'How do I contact YourBank\'s support?', a: 'You can reach our 24/7 support team via live chat in the app, by calling 1-800-YOURBANK, or by emailing support@yourbank.com. Our average response time is under 2 minutes.' },
  { q: 'Are my transactions and personal information secure?', a: 'Absolutely. We use 256-bit AES encryption, two-factor authentication, and continuous fraud monitoring to protect every account and transaction.' },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="faq" className="section faq-section" data-testid="faq-section">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">FAQs</p>
          <h2 className="section-heading">Frequently Asked Questions</h2>
        </div>
      </div>
      <p className="section-sub">
        Still have questions? Find from our <span className="accent-text">FAQ page</span> or contact us.
      </p>
      <div className="faq-list" data-testid="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`} data-testid={`faq-item-${i}`}>
            <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <span>{item.q}</span>
              <span className="faq-icon">{openIdx === i ? '−' : '+'}</span>
            </button>
            {openIdx === i && <div className="faq-answer" data-testid={`faq-answer-${i}`}>{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Sarah Mitchell', role: 'Small Business Owner', text: 'YourBank has completely transformed how I manage my business finances. The cash flow tools are a game changer.' },
  { name: 'James Carter', role: 'Freelancer', text: 'The savings rate and the mobile app experience are second to none. I feel totally in control of my money.' },
  { name: 'Amara Osei', role: 'Graduate Student', text: 'Opening an account was a breeze. The customer support team walked me through everything. Highly recommend!' },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="section testimonials-section" data-testid="testimonials-section">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Our Testimonials</p>
          <h2 className="section-heading">What Our Customers Say</h2>
        </div>
        <div className="testimonial-nav">
          <button className="nav-arrow" aria-label="Previous">‹</button>
          <button className="nav-arrow" aria-label="Next">›</button>
        </div>
      </div>
      <div className="testimonials-grid" data-testid="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card" data-testid={`testimonial-${i}`}>
            <div className="quote-mark">"</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.name[0]}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="cta-section" data-testid="cta-section">
      <div className="cta-content">
        <h2 className="cta-heading">
          Start your financial journey with{' '}
          <span className="cta-accent">YourBank today!</span>
        </h2>
        <p className="cta-desc">
          Take the first step toward financial freedom. Open your account online in
          minutes and experience the future of banking.
        </p>
      </div>
      <button className="btn-primary-accent" data-testid="cta-open-account">Open Account</button>
    </section>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
function HomePage() {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products`)
      .then((res) => setApiProducts(res.data))
      .catch(() => setApiProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroSection />
      <ProductsSection apiProducts={apiProducts} loading={loading} />
      <UseCasesSection />
      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

export default HomePage;
