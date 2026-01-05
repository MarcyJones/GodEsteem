import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, Shield, Users, BookOpen, Mail, MapPin, 
  Send, Star, Quote, Sparkles, CreditCard, Gift, Phone, 
  Instagram, Facebook, Twitter 
} from 'lucide-react';

const BackgroundLayers = ({ scrollProgress }) => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-black" />
    <motion.div style={{ y: scrollProgress }} className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%]">
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </motion.div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all px-6 py-4 ${isScrolled ? 'glass py-3' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-pink flex items-center justify-center font-bold">GE</div>
          <span className="font-bold text-xl">GOD Esteem</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            <a href="#mission" className="hover:text-pink-400 transition">Mission</a>
            <a href="#programs" className="hover:text-pink-400 transition">Programs</a>
            <a href="#donate" className="hover:text-pink-400 transition">Donate</a>
        </div>
        <a href="#donate" className="px-6 py-2 bg-gradient-pink rounded-full text-white font-bold text-sm glow-pink">DONATE</a>
      </div>
    </nav>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative min-h-screen">
      <BackgroundLayers scrollProgress={backgroundY} />
      <div className="relative z-10 noise-bg">
        <Navbar />
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
            <div className="text-center max-w-4xl">
                <h1 className="text-6xl md:text-8xl mb-8 leading-tight">
                    Your <span className="text-gradient-pink italic font-bold">God-Given</span> Worth.
                </h1>
                <p className="text-xl text-white/60 mb-10">Restoring identity and purpose in young girls through faith-based mentorship.</p>
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-4 bg-gradient-pink rounded-xl font-bold glow-pink">Our Programs</button>
                    <button className="px-8 py-4 glass rounded-xl font-bold">Learn More</button>
                </div>
            </div>
        </section>

        <section id="mission" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="glass p-12 rounded-[40px] border-white/5">
                <Shield className="text-pink-500 mb-6" size={40} />
                <h3 className="text-3xl font-bold mb-4 serif italic">Our Mission</h3>
                <p className="text-white/60 text-lg">To empower young girls through mentorship that affirms their value in Christ.</p>
            </div>
            <div className="glass p-12 rounded-[40px] border-purple-500/10">
                <Sparkles className="text-purple-500 mb-6" size={40} />
                <h3 className="text-3xl font-bold mb-4 serif italic">Our Vision</h3>
                <p className="text-white/60 text-lg">A world where girls radiate confidence born from their relationship with God.</p>
            </div>
        </section>

        <section id="donate" className="py-24 px-6 max-w-5xl mx-auto text-center">
            <div className="glass p-16 rounded-[60px] glow-border">
                <h2 className="text-4xl md:text-6xl mb-8">Empower her <span className="text-gradient-pink">Future.</span></h2>
                <p className="text-white/50 mb-10 text-lg">Your donations support scholarships and community circles.</p>
                <button className="px-12 py-5 bg-gradient-pink rounded-2xl font-bold text-xl glow-pink">GIVE NOW</button>
            </div>
        </section>

        <footer className="py-20 border-t border-white/5 text-center">
            <p className="text-white/20">© 2024 GOD Esteem • Huntsville, AL</p>
        </footer>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
