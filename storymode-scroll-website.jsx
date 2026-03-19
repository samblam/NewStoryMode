import React, { useState, useRef } from 'react';

// ============================================
// STORY MODE WEBSITE
// Continuous Scroll-Snap Design
// ============================================

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    --white: #FFFFFF;
    --black: #000000;
    --obby-orange: #E85A35;
    --eva-blue: #5774E9;
    --elysium-brown: #4E2A29;
    --storymode-green: #4CD964;
    --cta-red: #FF3500;
  }
  
  html {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Space Grotesk', -apple-system, sans-serif;
    background: var(--white);
    color: var(--black);
  }
  
  /* ========== SCROLL SNAP SECTIONS ========== */
  .section {
    min-height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    background: var(--white);
    overflow: hidden;
  }
  
  /* ========== COLOR INDICATOR (Top Right) ========== */
  .color-indicator {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 4px;
    z-index: 100;
  }
  
  .color-bar {
    width: 24px;
    height: 10px;
  }
  
  /* ========== HOME PAGE ========== */
  .home-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }
  
  .speaker-icon {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .speaker-left {
    left: 80px;
    transform: scaleX(-1);
  }

  .speaker-right {
    right: 80px;
  }
  
  .hero-card {
    background: var(--storymode-green);
    padding: 50px 55px;
    max-width: 500px;
    position: relative;
  }
  
  .hero-title {
    font-size: 38px;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 28px;
    color: var(--black);
  }
  
  .hero-subtitle {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--black);
  }
  
  .hero-description {
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 32px;
    color: var(--black);
  }
  
  .hero-label {
    font-size: 15px;
    margin-bottom: 12px;
    color: var(--black);
  }
  
  .hero-nav {
    list-style: disc;
    padding-left: 24px;
  }
  
  .hero-nav li {
    font-size: 15px;
    margin-bottom: 6px;
    color: var(--black);
  }
  
  /* ========== CASE STUDY PAGES ========== */
  .case-study-section {
    display: flex;
    padding: 60px 40px;
    gap: 30px;
  }
  
  .case-study-left {
    width: 340px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }
  
  .case-study-right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .case-study-title {
    font-size: 44px;
    font-weight: 700;
    margin-bottom: 50px;
    color: var(--black);
  }
  
  .case-study-title span {
    font-weight: 400;
  }
  
  .info-section {
    margin-bottom: 28px;
  }
  
  .info-section h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--black);
  }
  
  .info-section p {
    font-size: 15px;
    line-height: 1.65;
    color: var(--black);
  }
  
  .cta-link {
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    margin-top: auto;
    padding-top: 20px;
  }
  
  .sound-table-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .sound-table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .sound-table {
    width: 100%;
    border-collapse: collapse;
    color: var(--white);
    flex: 1;
  }
  
  .sound-table th,
  .sound-table td {
    padding: 14px 16px;
    text-align: center;
    border: 3px solid var(--white);
  }
  
  .sound-table th {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  
  .sound-table td {
    font-size: 14px;
  }
  
  .sound-table td:first-child {
    width: 55px;
  }
  
  .sound-table td:nth-child(2) {
    width: 140px;
  }
  
  .sound-table td:nth-child(3) {
    width: 110px;
  }
  
  .play-btn {
    width: 26px;
    height: 26px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    transition: transform 0.2s;
  }
  
  .play-btn:hover {
    transform: scale(1.2);
  }
  
  .play-btn svg {
    fill: var(--white);
  }
  
  .table-footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px 20px;
  }
  
  .external-link {
    color: var(--white);
    font-size: 28px;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  
  /* ========== ABOUT PAGE ========== */
  .about-section {
    display: flex;
    padding: 60px 40px;
    gap: 50px;
  }
  
  .about-left {
    flex: 1;
  }
  
  .about-right {
    width: 320px;
    flex-shrink: 0;
  }
  
  .team-member {
    border-top: 5px solid var(--black);
    padding: 28px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .member-info h2 {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--black);
  }
  
  .member-info p {
    font-size: 15px;
    line-height: 1.4;
    color: var(--black);
  }
  
  .member-photo {
    width: 150px;
    height: 170px;
    background: linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 12px;
  }
  
  .about-right h4 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--black);
  }
  
  .about-right h3 {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 28px;
    color: var(--black);
  }
  
  .about-right p {
    font-size: 15px;
    line-height: 1.75;
    margin-bottom: 18px;
    color: var(--black);
  }
  
  /* ========== PLAY PAGE ========== */
  .play-section {
    position: relative;
  }

  .play-item {
    position: absolute;
    cursor: pointer;
    transform: translate(-50%, -50%);
    mix-blend-mode: multiply;
  }

  .play-item video {
    display: block;
    transition: transform 0.2s ease;
    width: var(--item-size, 14vw);
    min-width: 80px;
    max-width: 200px;
  }

  .play-item:hover video {
    transform: scale(1.1);
  }
  
  /* ========== CONTACT PAGE ========== */
  .contact-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }
  
  .contact-wrapper {
    display: flex;
    align-items: center;
    gap: 50px;
  }
  
  .contact-form-card {
    background: var(--obby-orange);
    padding: 16px;
    width: 500px;
  }
  
  .contact-textarea {
    width: 100%;
    height: 420px;
    background: transparent;
    border: 4px solid var(--white);
    color: var(--white);
    font-family: inherit;
    font-size: 15px;
    padding: 16px;
    resize: none;
    outline: none;
    margin-bottom: 12px;
  }
  
  .contact-textarea::placeholder {
    color: rgba(255,255,255,0.8);
    font-weight: 500;
  }
  
  .contact-submit {
    width: 100%;
    height: 48px;
    background: transparent;
    border: 4px solid var(--white);
    color: var(--white);
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  
  .contact-submit:hover {
    background: var(--white);
    color: var(--obby-orange);
  }
  
  .contact-info h2 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--black);
  }
  
  .contact-info p {
    font-size: 15px;
    color: var(--black);
  }
  
  /* ========== SCROLL INDICATOR ========== */
  .scroll-indicator {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 100;
  }
  
  .scroll-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  
  .scroll-dot.active {
    background: var(--black);
    transform: scale(1.3);
  }
  
  .scroll-dot:hover {
    background: #888;
  }
  
  /* ========== RESPONSIVE ========== */
  @media (max-width: 1000px) {
    .case-study-section {
      flex-direction: column;
    }
    
    .case-study-left {
      width: 100%;
    }
    
    .about-section {
      flex-direction: column;
    }
    
    .about-right {
      width: 100%;
    }
    
    .speaker-icon {
      display: none;
    }
    
    .contact-wrapper {
      flex-direction: column;
    }
    
    .contact-form-card {
      width: 100%;
      max-width: 500px;
    }
  }
`;

// Play Button SVG
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <polygon points="4,2 16,9 4,16" />
  </svg>
);

// Speaker Icon Component
const SpeakerIcon = ({ side }) => (
  <div className={`speaker-icon speaker-${side}`}>
    <svg width="210" height="160" viewBox="0 0 210 160">
      {/* 3 sound wave lines — fanning from different y-positions, not converging to a point */}
      <line x1="68" y1="40"  x2="8"  y2="12"  stroke="#E85A35" strokeWidth="10" strokeLinecap="round"/>
      <line x1="68" y1="80"  x2="4"  y2="80"  stroke="#E85A35" strokeWidth="10" strokeLinecap="round"/>
      <line x1="68" y1="120" x2="8"  y2="148" stroke="#E85A35" strokeWidth="10" strokeLinecap="round"/>
      {/* Blue triangle — same y as brown, offset LEFT 25px so its diagonal edges are clearly visible */}
      <polygon points="70,15 70,145 162,80" fill="#5774E9"/>
      {/* Brown triangle — in front */}
      <polygon points="95,15 95,145 187,80" fill="#4E2A29"/>
    </svg>
  </div>
);

// Color Indicator (top right)
const ColorIndicator = () => (
  <div className="color-indicator">
    <div className="color-bar" style={{ background: '#4CD964' }} />
    <div className="color-bar" style={{ background: '#5774E9' }} />
    <div className="color-bar" style={{ background: '#E85A35' }} />
  </div>
);

// Scroll Indicator Dots
const ScrollIndicator = ({ sections, activeSection, onDotClick }) => (
  <div className="scroll-indicator">
    {sections.map((_, i) => (
      <div
        key={i}
        className={`scroll-dot ${activeSection === i ? 'active' : ''}`}
        onClick={() => onDotClick(i)}
      />
    ))}
  </div>
);

// ========== HOME SECTION ==========
const HomeSection = React.forwardRef((props, ref) => (
  <section ref={ref} className="section home-section">
    <SpeakerIcon side="left" />
    <div className="hero-card">
      <h1 className="hero-title">
        Welcome to STORY MODE, an audio branding studio that makes sound for people.
      </h1>
      <h2 className="hero-subtitle">UX and Product Sound</h2>
      <p className="hero-description">
        This website is documentation of our work, who we are and our vision for how sound 
        can be used to shape our relationship to technology.
        <br /><br />
        Please enjoy.
      </p>
      <p className="hero-label">Sections:</p>
      <ul className="hero-nav">
        <li>Work</li>
        <li>About</li>
        <li>Fun</li>
        <li>Contact</li>
      </ul>
    </div>
    <SpeakerIcon side="right" />
  </section>
));

// ========== CASE STUDY SECTION ==========
const CaseStudySection = React.forwardRef(({ data }, ref) => (
  <section ref={ref} className="section case-study-section">
    <div className="case-study-left">
      <h1 className="case-study-title">
        {data.title} <span>• {data.subtitle}</span>
      </h1>
      
      <div className="info-section">
        <h3>Client:</h3>
        <p>{data.client}</p>
      </div>
      
      <div className="info-section">
        <h3>Problem</h3>
        <p>{data.problem}</p>
      </div>
      
      <div className="info-section">
        <h3>Solution</h3>
        <p>{data.solution}</p>
      </div>
      
      <a href="#" className="cta-link" style={{ color: data.ctaColor }}>
        [listen to the sound set] →
      </a>
    </div>
    
    <div className="case-study-right">
      <div className="sound-table-wrapper">
        <div className="sound-table-container" style={{ background: data.accentColor }}>
          <table className="sound-table">
            <thead>
              <tr>
                <th></th>
                <th>Sound</th>
                <th>Type</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {data.sounds.map((sound, i) => (
                <tr key={i}>
                  <td>
                    <button className="play-btn">
                      <PlayIcon />
                    </button>
                  </td>
                  <td>{sound.name}</td>
                  <td>{sound.type}</td>
                  <td>{sound.function}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer" style={{ background: data.accentColor }}>
            <a href={data.url} className="external-link" target="_blank" rel="noopener noreferrer">
              {data.url}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
));

// ========== ABOUT SECTION ==========
const AboutSection = React.forwardRef((props, ref) => {
  const team = [
    { name: 'Ben', roles: ['Co-Founder', 'Composer'] },
    { name: 'Nick', roles: ['Co-Founder', 'Sound Designer'] },
    { name: 'Sam', roles: ['Co-Founder', 'Business Development'] },
  ];

  return (
    <section ref={ref} className="section about-section">
      <div className="about-left">
        {team.map((member, i) => (
          <div key={i} className="team-member">
            <div className="member-info">
              <h2>{member.name}</h2>
              {member.roles.map((role, j) => (
                <p key={j}>{role}</p>
              ))}
            </div>
            <div className="member-photo">[Photo]</div>
          </div>
        ))}
      </div>
      
      <div className="about-right">
        <h4>About Us</h4>
        <h3>STORY MODE LLC</h3>
        <p>
          Nick and Ben started Story Mode at the beginning of 2023, Sam joined the following year.
        </p>
        <p>
          Story Mode is a music house that specializes in audio design for interfaces and human experiences.
        </p>
        <p>
          Our mission is simple: to shape how the relationship between humans and machines will sound 
          for the next coming 100 years.
        </p>
      </div>
    </section>
  );
});

// ========== PLAY SECTION ==========
const characters = [
  { name: 'bird',       video: 'character animations/bird.mp4',       audio: 'sounds/bird.wav',        x: '8%',  y: '7%',  size: '13vw' },
  { name: 'glyph',      video: 'character animations/glyph.mp4',      audio: 'sounds/glyph.wav',       x: '34%', y: '4%',  size: '11vw' },
  { name: 'mondrian',   video: 'character animations/mondrian.mp4',   audio: 'sounds/mondrian.wav',    x: '62%', y: '8%',  size: '15vw' },
  { name: 'star',       video: 'character animations/star.mp4',       audio: 'sounds/star.wav',        x: '89%', y: '5%',  size: '13vw' },
  { name: 'pizza',      video: 'character animations/pizza.mp4',      audio: 'sounds/pizza.wav',       x: '5%',  y: '44%', size: '12vw' },
  { name: 'runner',     video: 'character animations/runner.mp4',     audio: 'sounds/running man.wav', x: '30%', y: '50%', size: '14vw' },
  { name: 'semicircle', video: 'character animations/semicircle.mp4', audio: 'sounds/semicircle.wav',  x: '57%', y: '38%', size: '11vw' },
  { name: 'pentaline',  video: 'character animations/pentaline.mp4',  audio: 'sounds/pentaline.wav',   x: '84%', y: '46%', size: '13vw' },
  { name: 'smile',      video: 'character animations/smile.mp4',      audio: 'sounds/smile.wav',       x: '15%', y: '72%', size: '12vw' },
  { name: 'dotsquare',  video: 'character animations/dotsquare.mp4',  audio: 'sounds/dotsquare.wav',   x: '44%', y: '70%', size: '11vw' },
  { name: 'spinner',    video: 'character animations/spinner.mp4',    audio: 'sounds/spinner.wav',     x: '76%', y: '68%', size: '14vw' },
];

const PlaySection = React.forwardRef((props, ref) => {
  const [active, setActive] = useState(null);
  const videoRefs = useRef({});
  const audioRefs = useRef({});

  const handleEnded = (name) => {
    setActive(n => n === name ? null : n);
  };

  const handleClick = (name) => {
    // Stop whatever is currently playing
    if (active) {
      const prevVideo = videoRefs.current[active];
      const prevAudio = audioRefs.current[active];
      if (prevVideo) { prevVideo.pause(); prevVideo.currentTime = 0; }
      if (prevAudio) { prevAudio.pause(); prevAudio.currentTime = 0; }
    }

    if (active === name) {
      setActive(null);
    } else {
      const video = videoRefs.current[name];
      const audio = audioRefs.current[name];
      if (video) video.play();
      if (audio) audio.play();
      setActive(name);
    }
  };

  return (
    <section ref={ref} className="section play-section">
      {characters.map(({ name, video, audio, x, y, size }) => (
        <div key={name} className="play-item" style={{ left: x, top: y, '--item-size': size }} onClick={() => handleClick(name)}>
          <video
            ref={el => videoRefs.current[name] = el}
            src={video}
            muted
            playsInline
            onEnded={handleEnded.bind(null, name)}
          />
          <audio
            ref={el => audioRefs.current[name] = el}
            src={audio}
            onEnded={handleEnded.bind(null, name)}
          />
        </div>
      ))}
    </section>
  );
});

// ========== CONTACT SECTION ==========
const ContactSection = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState('');

  return (
    <section ref={ref} className="section contact-section">
      <div className="contact-wrapper">
        <div className="contact-form-card">
          <textarea
            className="contact-textarea"
            placeholder="Start Typing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="contact-submit">Send</button>
        </div>
        <div className="contact-info">
          <h2>How can we help?</h2>
          <p>email:</p>
        </div>
      </div>
    </section>
  );
});

// ========== CASE STUDY DATA ==========
const caseStudies = {
  obby: {
    title: 'OBBY',
    subtitle: 'Geosocial Networking',
    client: 'A meetup app that brings people together through shared sports and activities.',
    problem: "Create a suite of sounds for their platform that would make the experience feel familiar to a networking app yet standout in it's sophistication.",
    solution: "We created an airy and refined sonic pallet to match the assuredness of Obby's personality. The sound set blends knocking percussive elements and simple harmonic timbres, giving it polished confidence and assuredness. The primary cues of match and message have familiar harmonic voicing, yet stand out slightly with their texture.",
    sounds: [
      { name: 'Message', type: 'Alert', function: 'Message from a new friend' },
      { name: 'Match', type: 'Alert', function: 'Successful match based on shared hobbies' },
      { name: 'Activity', type: 'UI', function: 'Choosing activities at the start of the user journey' },
      { name: 'Sound', type: 'UI', function: 'Participating in a group activity; rewarded with discounts' },
    ],
    accentColor: '#E85A35',
    ctaColor: '#FF3500',
    url: 'https://www.obbyapp.com/',
  },
  eva: {
    title: 'EVA',
    subtitle: 'Rideshare',
    client: 'Rideshare app with focus on sustainability between drivers and merchants. They create white label delivery solutions for B2C businesses.',
    problem: 'Create distinctive sound set that alerts drivers of various types of orders without looking at their phone.',
    solution: 'We chose woody and rounded sounds to create this sound set. The pallet it inviting and warm, but also attention grabbing. We drew inspiration from aspen stands; a community of hundreds trees that make up one living organism. The four different orders correspond to different variations of the major inversions of the A Major scale.',
    sounds: [
      { name: 'People', type: 'Alert', function: 'Message from a new friend' },
      { name: 'Food', type: 'Alert', function: 'Successful match based on shared hobbies' },
      { name: 'Item', type: 'Alert', function: 'Choosing activities at the start of the user journey' },
      { name: 'Marijuana', type: 'Alert', function: 'Participating in a group activity; rewarded with discounts' },
      { name: 'Cash Out', type: 'UI', function: 'Participating in a group activity; rewarded with discounts' },
      { name: 'Promotion', type: 'Confirmation', function: 'Participating in a group activity; rewarded with discounts' },
    ],
    accentColor: '#5774E9',
    ctaColor: '#5774E9',
    url: 'https://eva.coop/',
  },
  elysium: {
    title: 'Elysium',
    subtitle: 'XR Social Platform',
    client: 'Elysium is an XR creation environment where users can populate worlds with their 3D assets and visitors can view them in real time adn space.',
    problem: 'Provide sonic guidance to the user to alleviate the complexity of the user experience.',
    solution: 'This sound set needed to sound futuristic yet calm. We constructed a pallet that made users aware of the various actions of the interface while still being calm and soothing.',
    sounds: [
      { name: 'Login Background', type: 'Ambience', function: 'Evolving ambient track that plays at the login page' },
      { name: 'Sonic Logo', type: 'Confirmation', function: 'Branded tag that plays when opening app' },
      { name: 'Login', type: 'Confirmation', function: 'Successful login' },
      { name: 'Logout', type: 'Confirmation', function: 'Successful logout' },
      { name: 'Enter Scene', type: 'UI', function: 'Entering scene' },
      { name: 'Node Place', type: 'UI', function: 'Participating in a group activity; rewarded with discounts' },
      { name: 'Node Delete', type: 'UI', function: 'Participating in a group activity; rewarded with discounts' },
      { name: 'Asset Place', type: 'UI', function: 'Participating in a group activity; rewarded with discounts' },
    ],
    accentColor: '#4E2A29',
    ctaColor: '#4E2A29',
    url: 'https://elysium.ar/',
  },
};

// ========== MAIN APP ==========
export default function StoryModeWebsite() {
  const [activeSection, setActiveSection] = useState(0);
  
  const sectionRefs = [
    useRef(null), // Home
    useRef(null), // OBBY
    useRef(null), // EVA
    useRef(null), // Elysium
    useRef(null), // About
    useRef(null), // Play
    useRef(null), // Contact
  ];
  
  const sections = ['home', 'obby', 'eva', 'elysium', 'about', 'play', 'contact'];

  const scrollToSection = (index) => {
    sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Track active section on scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex(
              (ref) => ref.current === entry.target
            );
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      
      <ColorIndicator />
      <ScrollIndicator 
        sections={sections} 
        activeSection={activeSection} 
        onDotClick={scrollToSection} 
      />
      
      <HomeSection ref={sectionRefs[0]} />
      <CaseStudySection ref={sectionRefs[1]} data={caseStudies.obby} />
      <CaseStudySection ref={sectionRefs[2]} data={caseStudies.eva} />
      <CaseStudySection ref={sectionRefs[3]} data={caseStudies.elysium} />
      <AboutSection ref={sectionRefs[4]} />
      <PlaySection ref={sectionRefs[5]} />
      <ContactSection ref={sectionRefs[6]} />
    </>
  );
}
