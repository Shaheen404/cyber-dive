import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stars, 
  OrbitControls, 
  PerspectiveCamera, 
  Float
} from '@react-three/drei';
import { 
  Bloom, 
  EffectComposer, 
  Noise, 
  Vignette, 
  Scanline 
} from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const cyberKnowledgeBase = {
  home: { 
    title: "OP3R4TIONS C3NT3R", 
    body: "Welcome to the front lines of digital sovereignty.",
    quote: "“The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room.” — Gene Spafford",
    interactiveCards: [
      { 
        id: "core", 
        title: "WHAT IS IT?", 
        content: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.",
        detail: "Securing the human, hardware, and code."
      },
      { 
        id: "status", 
        title: "CURRENT THREAT", 
        content: "In 2026, global cybercrime damage is projected to exceed $10.5 trillion annually.",
        detail: "Real-time monitoring is the only way forward."
      },
      { 
        id: "mission", 
        title: "THE OBJECTIVE", 
        content: "Neutralize architectural weaknesses before they are weaponized.",
        detail: "To Secure Global Infrastructure before hackers exploit them and establish Backdoors."
      }
    ],
    metrics: [
      { label: "THREATS_BLOCKED", value: "1402", suffix: "+" },
      { label: "NETWORK_LATENCY", value: "12", suffix: "ms" }
    ]
  },
  fields: { 
    title: "CYB3R D0MA1NS", 
    body: "The landscape of cybersecurity is divided into specialized battlegrounds.",
    sectors: [
      { name: "Web Security", description: "VAPT, SQLi, and XSS mitigation." },
      { name: "Network Defense", description: "Firewalls, IDS/IPS, and packet analysis." },
      { name: "Cloud Security", description: "Securing AWS, Azure, and Kubernetes." },
      { name: "Forensics", description: "Digital investigation and malware analysis." }
    ]
  },
  hackers: { 
    title: "TYP3 0F H4CK3RS", 
    body: "Understanding the motivations and methods of digital operatives.",
    sectors: [
      { name: "White Hat", description: "Ethical hackers and security researchers." },
      { name: "Black Hat", description: "Malicious actors seeking gain or disruption." },
      { name: "Grey Hat", description: "Operating without permission but often without malice." }
    ]
  },
  teams: { 
    title: "OP3RAT10NAL UN1TS", 
    body: "Organizational structures for modern security operations.",
    sectors: [
      { name: "Red Team", description: "Offensive specialists simulating real attacks." },
      { name: "Blue Team", description: "Defensive specialists maintaining uptime and response." },
      { name: "Purple Team", description: "Collaborative unit optimizing both attack and defense." }
    ]
  }
};

const HazardFan = () => {
  const groupRef = useRef();
  useFrame((state) => {
    groupRef.current.rotation.z += 0.02;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="white" wireframe />
      </mesh>
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((rotation, i) => (
        <group key={i} rotation={[0, 0, rotation]}>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.8, 1.5, 3]} />
            <meshStandardMaterial 
              color="#00ff88" 
              emissive="#00ff88" 
              emissiveIntensity={2} 
              wireframe 
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const InteractiveStars = () => {
  const starsRef = useRef();
  useFrame((state) => {
    starsRef.current.rotation.y += 0.0005;
    starsRef.current.rotation.x += (state.mouse.y * 0.02);
    starsRef.current.rotation.z += (state.mouse.x * 0.02);
  });
  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={2} />
    </group>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="cyber-container">
      <div className="scanline"></div>
      
      <nav className="glass-console main-header">
        <div className="brand-title">CYBERDIVE BY SHAHEEN</div>
        <div className="nav-links">
          {['home', 'fields', 'hackers', 'teams'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t)} 
              className={activeTab === t ? 'active' : ''}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <div className="main-scroll-container">
        <AnimatePresence mode="wait">
          <ContentDisplay 
            key={activeTab} 
            tab={activeTab} 
            data={cyberKnowledgeBase[activeTab]} 
          />
        </AnimatePresence>
      </div>

      <div className="canvas-layer">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="white" />
          <Suspense fallback={null}>
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
              <HazardFan />
            </Float>
            <InteractiveStars />
            <EffectComposer>
              <Bloom luminanceThreshold={0.1} intensity={1.5} mipmapBlur />
              <Noise opacity={0.01} />
              <Vignette darkness={0.7} />
              <Scanline opacity={0.05} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

const ContentDisplay = ({ tab, data }) => {
  if (!data) {
    return (
      <div className="info-panel">
        <h1 className="white-text glitch-header">DATA_NOT_FOUND</h1>
        <p className="white-text">System error: requested node is offline.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 30 }}
      className="info-panel"
    >
      <h1 className="white-text glitch-header" data-text={data.title}>{data.title}</h1>
      
      <div className="content-body">
        {tab === 'home' ? (
          <div className="home-dashboard">
            <p className="quote-text">{data.quote}</p>
            <div className="home-card-grid">
              {data.interactiveCards.map((card, i) => (
                <motion.div 
                  key={card.id}
                  whileHover={{ scale: 1.02, borderColor: "#00ff88" }}
                  className="interactive-card"
                >
                  <div className="card-header">{card.title}</div>
                  <p className="card-content">{card.content}</p>
                  <div className="card-detail-reveal">{card.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="sector-view">
            <p className="white-text main-body" style={{ marginBottom: '30px', opacity: 0.8 }}>{data.body}</p>
            <div className="home-card-grid">
              {data.sectors?.map((s, i) => (
                <div key={i} className="interactive-card">
                  <div className="card-header" style={{ color: '#00ccff' }}>{s.name}</div>
                  <p className="card-content">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default App;