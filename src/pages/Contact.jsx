// Contact.jsx — Contact page with form and toast notification
import { useState } from 'react';
import Toast from '../components/Toast';
import '../styles/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    setSubmitted(true);
    setToast({ message: 'Message sent! We\'ll get back to you within 24 hours. 📧', type: 'success' });
  };

  const faqs = [
    { q: 'How do I become a student driver?', a: 'Register on the app, submit your vehicle documents through the Profile section, and await verification (24–48 hrs).' },
    { q: 'When do grocery orders get delivered?', a: 'Weekly orders close every Sunday at 8 PM and are delivered every Tuesday by our volunteer team.' },
    { q: 'Is there a minimum order for EliteEats?', a: 'No minimum! Order even a single chai for just ₹15 delivery.' },
    { q: 'How do I report a safety issue?', a: 'Use the SOS button on the EliteRide page or email us at safety@elitex.app immediately.' },
  ];

  return (
    <>
      <div className="contact-page">
        <div className="page-header">
          <div className="container">
            <h1>📬 Contact Us</h1>
            <p>We're a student team — we actually read every message!</p>
          </div>
        </div>

        <div className="container contact-body">
          {/* Contact info cards */}
          <div className="contact-info-row">
            {[
              { icon: '📧', title: 'Email', value: 'hello@elitex.app', sub: 'Reply within 24 hrs' },
              { icon: '📞', title: 'Phone', value: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 6 PM' },
              { icon: '📍', title: 'Address', value: 'RNS IT Campus, Bangalore', sub: 'Come meet us!' },
            ].map((info) => (
              <div key={info.title} className="contact-info-card card">
                <span className="contact-info-icon">{info.icon}</span>
                <h4>{info.title}</h4>
                <p className="contact-info-val">{info.value}</p>
                <span className="contact-info-sub">{info.sub}</span>
              </div>
            ))}
          </div>

          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-card card">
              <h3>Send Us a Message</h3>
              {submitted ? (
                <div className="contact-success">
                  <span>🎉</span>
                  <h4>Message Sent!</h4>
                  <p>Thanks for reaching out. Our student team will respond within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label htmlFor="contact-name">Your Name *</label>
                    <input id="contact-name" type="text" name="name" className="input-field" placeholder="Aarav Sharma" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input id="contact-email" type="email" name="email" className="input-field" placeholder="you@campus.edu" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <select id="contact-subject" name="subject" className="input-field sort-select" value={form.subject} onChange={handleChange}>
                      <option value="">Select a topic</option>
                      <option>General Inquiry</option>
                      <option>EliteEats Issue</option>
                      <option>EliteRide Issue</option>
                      <option>EliteMart Issue</option>
                      <option>Become a Driver</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea id="contact-message" name="message" className="input-field" rows={5} placeholder="Tell us what's on your mind..." value={form.message} onChange={handleChange} style={{ resize: 'vertical' }} required />
                  </div>
                  <button id="contact-submit" type="submit" className="btn btn-primary w-full">
                    🚀 Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div className="contact-faq">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <details key={i} className="faq-item card">
                    <summary className="faq-question">{faq.q}</summary>
                    <p className="faq-answer">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
