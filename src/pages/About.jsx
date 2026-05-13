// About.jsx — About page with team and mission
import '../styles/About.css';

const team = [
  { name: 'Aarav Sharma', role: 'Founder & CEO', avatar: '🧑‍💻', college: 'RNS IT, Bangalore' },
  { name: 'Priya Patel', role: 'Product Lead', avatar: '👩‍🎓', college: 'DSI College, Bangalore' },
  { name: 'Rohan Mehta', role: 'Tech Lead', avatar: '🧑‍🔬', college: 'RVCE, Bangalore' },
  { name: 'Anjali Nair', role: 'Design Lead', avatar: '👩‍💻', college: 'BMS College, Bangalore' },
];

const values = [
  { icon: '🎓', title: 'Student First', desc: 'Every decision is made with the student experience in mind.' },
  { icon: '💡', title: 'Community Driven', desc: 'We are built by students, for students, and powered by the community.' },
  { icon: '🤝', title: 'Trust & Safety', desc: 'Verified drivers, secure ordering, and transparent pricing always.' },
  { icon: '🌱', title: 'Sustainable', desc: 'Pooled orders and shared rides reduce our collective carbon footprint.' },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-badge">Our Story</div>
          <h1>Built for students,<br />by students.</h1>
          <p className="about-hero-desc">
            EliteX was born out of frustration. When Uber, Ola, Zomato, and BigBasket don't reach your campus — you build your own solution. That's exactly what we did at RNS IT.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section about-mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-text">
              <span className="label">Our Mission</span>
              <h2>Connecting campus communities through technology.</h2>
              <p>
                We believe every student — no matter how remote their college — deserves access to reliable food delivery, safe transportation, and affordable grocery shopping. EliteX makes that possible through peer-to-peer networks and community pooling.
              </p>
              <div className="mission-stats">
                <div className="m-stat"><strong>4,500+</strong><span>Students served</span></div>
                <div className="m-stat"><strong>₹12L+</strong><span>Student savings</span></div>
                <div className="m-stat"><strong>8</strong><span>Colleges active</span></div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="mission-card-stack">
                <div className="m-card m-card-1">🍱 12,400+ food orders</div>
                <div className="m-card m-card-2">🛵 8,200+ rides completed</div>
                <div className="m-card m-card-3">🛒 5,800+ grocery deliveries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <div className="section-header">
            <span className="label">Core Values</span>
            <h2>What Drives Us</h2>
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card card">
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <div className="section-header">
            <span className="label">The Team</span>
            <h2>Meet the Founders</h2>
            <p>A passionate group of students who turned a campus problem into a startup.</p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card card">
                <div className="team-avatar">{member.avatar}</div>
                <h4 className="team-name">{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <span className="team-college">{member.college}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
