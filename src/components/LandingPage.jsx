import React, { useEffect, useRef } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  // Intersection Observer for fade-in animations on scroll
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const hiddenElements = document.querySelectorAll('.scroll-fade');
    hiddenElements.forEach(el => observerRef.current.observe(el));

    return () => observerRef.current.disconnect();
  }, []);

  return (
    <div className="landing-page">
      
      {/* 2. PRODUCTS SECTION */}
      <section className="lp-section">
        <div className="lp-container">
          <h2 className="lp-heading scroll-fade">Our Innovations</h2>
          
          <div className="product-grid">
            {/* Shramico Card */}
            <div className="product-card glass-panel scroll-fade">
              <div className="pc-image-wrapper">
                <div className="pc-placeholder-img shramico-img"></div>
              </div>
              <div className="pc-content">
                <div className="pc-header">
                  <div className="pc-title-row">
                    <img src="https://shramico.com/Shramico_logo.jpeg" alt="Shramico Logo" className="pc-logo" />
                    <h3 className="pc-title">Shramico</h3>
                  </div>
                  <span className="badge badge-active">Flagship Platform</span>
                </div>
                <p className="pc-desc">
                  Advanced architectural platform designed to unify enterprise systems through intelligent automation and scalable microservices.
                </p>
                <div className="pc-tech">
                  <span>React</span><span>Node.js</span><span>AWS</span><span>AI</span>
                </div>
                <button className="btn-primary">Explore Shramico</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT WHITESTORMM */}
      <section className="lp-section bg-darker">
        <div className="lp-container">
          <div className="about-grid">
            <div className="about-text scroll-fade">
              <h2 className="lp-heading">Who We Are</h2>
              <p className="lp-paragraph">
                WhiteStormm is a vanguard technology collective. We engineer premium software platforms that bridge the gap between human intuition and machine intelligence. 
              </p>
              <p className="lp-paragraph">
                Our vision is a future where digital infrastructure is invisible, effortless, and infinitely scalable. We build not just to solve today's problems, but to define tomorrow's standards.
              </p>
            </div>
            <div className="about-visual glass-panel scroll-fade">
              <div className="abstract-globe"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INNOVATION PHILOSOPHY (Timeline) */}
      <section className="lp-section">
        <div className="lp-container">
          <h2 className="lp-heading text-center scroll-fade">Innovation Philosophy</h2>
          
          <div className="timeline scroll-fade">
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <h4>Idea</h4>
              <p>Conceptualizing the impossible.</p>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <h4>Research</h4>
              <p>Rigorous validation.</p>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <h4>Engineering</h4>
              <p>Precision execution.</p>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <h4>Testing</h4>
              <p>Relentless refinement.</p>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="tl-dot"></div>
              <h4>Launch</h4>
              <p>Deploying excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY STACK */}
      <section className="lp-section bg-darker">
        <div className="lp-container">
          <h2 className="lp-heading text-center scroll-fade">Technology Stack</h2>
          <div className="tech-stack-grid scroll-fade">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'Flutter', 'Python', 'AI / ML', 'Cloud Infrastructure', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'].map(tech => (
              <div key={tech} className="tech-item glass-panel">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCT */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="featured-product glass-panel scroll-fade">
            <div className="fp-content">
              <span className="badge badge-featured">Featured Spotlight</span>
              <h2 className="lp-heading" style={{ marginTop: '1rem' }}>Shramico Ecosystem</h2>
              <ul className="fp-features">
                <li><span className="fp-icon">✓</span> Real-time synchronization architecture</li>
                <li><span className="fp-icon">✓</span> Zero-latency edge computing</li>
                <li><span className="fp-icon">✓</span> Bank-grade encryption protocols</li>
                <li><span className="fp-icon">✓</span> Intuitive human-machine interfaces</li>
              </ul>
              <button className="btn-primary mt-4">Visit Shramico</button>
            </div>
            <div className="fp-image">
               <div className="dashboard-mockup">
                 <div className="mock-header"></div>
                 <div className="mock-body">
                   <div className="mock-sidebar"></div>
                   <div className="mock-content">
                     <div className="mock-card"></div>
                     <div className="mock-card w-half"></div>
                     <div className="mock-card w-half"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FUTURE PRODUCTS */}
      <section className="lp-section bg-darker">
        <div className="lp-container">
          <h2 className="lp-heading scroll-fade">Future Horizons</h2>
          <div className="future-grid">
            {[
              { name: 'AI Platform', desc: 'Next-generation cognitive engines.' },
              { name: 'Enterprise Tools', desc: 'Streamlined corporate operations.' },
              { name: 'Healthcare Solutions', desc: 'Precision biotech analytics.' },
              { name: 'Automation Suite', desc: 'Robotic process automation.' }
            ].map(prod => (
              <div key={prod.name} className="future-card glass-panel scroll-fade">
                <span className="badge badge-soon">Coming Soon</span>
                <h4>{prod.name}</h4>
                <p>{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY WHITESTORMM */}
      <section className="lp-section">
        <div className="lp-container">
          <h2 className="lp-heading text-center scroll-fade">Why WhiteStormm</h2>
          <div className="why-grid">
            {[
              { title: 'Premium Engineering', icon: '⚡' },
              { title: 'Performance First', icon: '🚀' },
              { title: 'Human-Centered', icon: '👁' },
              { title: 'Scalable Architecture', icon: '🏗' },
              { title: 'Zero-Trust Security', icon: '🔒' },
              { title: 'Relentless Innovation', icon: '💡' }
            ].map(feature => (
              <div key={feature.title} className="why-card scroll-fade">
                <div className="why-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STATISTICS */}
      <section className="lp-section bg-darker">
        <div className="lp-container">
          <div className="stats-grid scroll-fade">
            <div className="stat-item">
              <div className="stat-number">42+</div>
              <div className="stat-label">Projects Deployed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Enterprise Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="lp-section">
        <div className="lp-container">
          <h2 className="lp-heading scroll-fade">Partner Testimonials</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card glass-panel scroll-fade">
              <p>"WhiteStormm didn't just build our platform; they redefined our entire digital strategy. The engineering quality is indistinguishable from magic."</p>
              <div className="t-author">— Sarah Jenkins, CEO at Nexus</div>
            </div>
            <div className="testimonial-card glass-panel scroll-fade">
              <p>"The level of polish, performance, and attention to detail is unparalleled. They operate at the bleeding edge of modern web architecture."</p>
              <div className="t-author">— Marcus Thorne, CTO at Aether</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. BLOG */}
      <section className="lp-section bg-darker">
        <div className="lp-container">
          <h2 className="lp-heading scroll-fade">Latest Insights</h2>
          <div className="blog-grid">
            {[
              { cat: 'Engineering', title: 'The Future of Edge Computing in 2027' },
              { cat: 'AI', title: 'Integrating Cognitive Models into UI' },
              { cat: 'Product Design', title: 'Why Micro-Interactions Matter' }
            ].map((post, i) => (
              <div key={i} className="blog-card glass-panel scroll-fade">
                <span className="blog-cat">{post.cat}</span>
                <h4>{post.title}</h4>
                <div className="blog-link">Read Article <span>→</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="lp-section">
        <div className="lp-container">
          <h2 className="lp-heading text-center scroll-fade">Frequently Asked Questions</h2>
          <div className="faq-grid scroll-fade">
            {[
              { q: 'What is WhiteStormm?', a: 'An advanced technology collective building premium digital ecosystems.' },
              { q: 'What products do you build?', a: 'Enterprise software, AI platforms, and zero-latency data infrastructure.' },
              { q: 'What is Shramico?', a: 'Our flagship architectural platform for enterprise microservices.' },
              { q: 'How can I collaborate?', a: 'Reach out to our engineering directors via the contact form below.' },
              { q: 'Do you offer enterprise solutions?', a: 'Yes. We build entirely bespoke infrastructure for billion-dollar enterprises.' }
            ].map(faq => (
              <div key={faq.q} className="faq-item glass-panel">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CAREERS & 14. CONTACT */}
      <section className="lp-section bg-darker">
        <div className="lp-container">
          <div className="bottom-grid scroll-fade">
            
            <div className="careers-box glass-panel">
              <h2 className="lp-heading">Careers</h2>
              <p>We are always looking for exceptional talent to join our engineering and design teams.</p>
              <ul className="career-list">
                <li>Senior Frontend Architect <span>Remote</span></li>
                <li>Machine Learning Engineer <span>London</span></li>
                <li>Product Designer <span>Remote</span></li>
              </ul>
              <button className="btn-secondary mt-4">View All Positions</button>
            </div>

            <div className="contact-box glass-panel">
              <h2 className="lp-heading">Contact Us</h2>
              <p>Ready to build the future?</p>
              <form className="contact-form">
                <input type="email" placeholder="Email Address" className="form-input" />
                <textarea placeholder="How can we help?" className="form-input" rows="3"></textarea>
                <button className="btn-primary">Send Message</button>
              </form>
              <div className="social-links mt-4">
                <a href="#">LinkedIn</a>
                <a href="#">GitHub</a>
                <a href="#">Twitter</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="footer-grid">
            <div className="f-col">
              <h3>WhiteStormm</h3>
              <p className="mt-2">Engineering the impossible.</p>
            </div>
            <div className="f-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
            </div>
            <div className="f-col">
              <h4>Products</h4>
              <a href="#">Shramico</a>
              <a href="#">Ecosystem</a>
            </div>
            <div className="f-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} WhiteStormm Technologies. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
