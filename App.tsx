
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './components/Icons';
import { ChatWidget } from './components/ChatWidget';
import { WeatherWidget } from './components/WeatherWidget';
import { TimeWidget } from './components/TimeWidget';
import { GithubCard } from './components/GithubCard';
import { SkillGrid } from './components/SkillGrid';
import { ContactForm } from './components/ContactForm';
import { Tamagotchi } from './components/Tamagotchi';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingScreen } from './components/LoadingScreen';
import { EXPERIENCE, PROJECTS, SOCIALS, BIO, NAV_LINKS, CERTIFICATIONS, RECRUITER_CONTENT, PROFILE_IMAGE } from './constants';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// --- Animated Section Component ---
const Section = ({ id, children, className = "" }: { id: string; children?: React.ReactNode; className?: string }) => {
  return (
    <motion.section 
      id={id} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-50px" }}
      className={`min-h-screen flex flex-col justify-center lg:snap-start py-16 lg:py-0 px-6 md:px-12 lg:px-0 ${className}`}
    >
      <div className="w-full">
        {children}
      </div>
    </motion.section>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Initialize Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handle Scroll Spy for the Custom Container
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollPos = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
      
      setScrollProgress(progress);
      
      // SectionSpy
      const spyPosition = scrollPos + (window.innerHeight / 3);
      const sections = NAV_LINKS.map(link => link.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (offsetTop <= spyPosition && offsetBottom > spyPosition) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const container = scrollContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Magnetic Button Effect
  const handleButtonMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setButtonPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleButtonMouseLeave = () => {
    setButtonPosition({ x: 0, y: 0 });
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-screen w-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 selection:bg-teal-300 selection:text-teal-900 overflow-hidden relative flex transition-colors duration-500">
      
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 h-16 flex items-center justify-between px-6">
        <span className="font-bold text-lg text-neutral-900 dark:text-neutral-100">Badrish MS</span>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <Icons.Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-neutral-50 dark:bg-neutral-950 flex flex-col p-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg text-neutral-900 dark:text-neutral-100">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Icons.X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-medium text-neutral-800 dark:text-neutral-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                  href="/resume.pdf"
                  className="text-2xl font-medium text-neutral-800 dark:text-neutral-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                  Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,#0a0a0a_100%)]"></div>
      </div>

      {/* Mouse Spotlight (Fixed to Viewport) */}
      {isDark && (
        <div 
          className="pointer-events-none fixed inset-0 z-30 transition duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.06), transparent 80%)`
          }}
        />
      )}

      {/* Interactive Tamagotchi */}
      <Tamagotchi isDark={isDark} />

      {/* Theme Toggle (Fixed Top Right) - Desktop Only */}
      <div className="hidden lg:flex fixed top-6 right-6 z-50 flex-col gap-4">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </div>

      {/* Scroll Indicator (Fade out on scroll) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: !loading && scrollProgress < 0.02 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-6 left-1/2 lg:left-[75%] transform -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-medium animate-pulse">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center p-1.5"
        >
          <Icons.Mouse size={24} className="text-neutral-400 dark:text-neutral-500" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <div className="w-full h-full max-w-screen-xl mx-auto flex relative z-10">
          
          {/* LEFT COLUMN: Static Info (Hidden on Mobile, Visible lg) */}
          {/* Added overflow-y-auto to allow scrolling on landscape tablets if height is constrained */}
          <header className="hidden lg:flex lg:w-1/2 h-full flex-col justify-between py-20 px-12 lg:px-24 relative z-10 overflow-y-auto scrollbar-hide">
            <div>
              
              {/* Profile Picture with Glow Effect */}
              <div className="mb-8 relative group w-max animate-fade-in">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src={PROFILE_IMAGE}
                  alt="Badrish MS" 
                  className="relative w-32 h-32 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-teal-50 dark:bg-teal-400/10 border border-teal-200 dark:border-teal-400/20 text-teal-700 dark:text-teal-300 text-xs font-medium animate-fade-in" style={{ animationDelay: '50ms' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Available for work • Open to Relocation
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl animate-fade-in">
                <a href="/">Badrish MS</a>
              </h1>
              <h2 className="mt-4 text-lg font-medium tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-xl animate-fade-in" style={{ animationDelay: '100ms' }}>
                Data Engineer & Creative Technologist
              </h2>
              <p className="mt-6 max-w-xs leading-relaxed text-neutral-600 dark:text-neutral-400 animate-fade-in" style={{ animationDelay: '200ms' }}>
                I build pixel-perfect, data-driven digital experiences using modern cloud architecture.
              </p>
              
              <div className="mt-6 flex flex-col items-start gap-2 animate-fade-in" style={{ animationDelay: '250ms' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm text-xs font-medium text-neutral-600 dark:text-neutral-400 shadow-sm">
                  <Icons.MapPin size={14} className="text-teal-600 dark:text-teal-400" />
                  <span>Bremen, Germany 🇩🇪</span>
                </div>
                <WeatherWidget />
                <TimeWidget />
              </div>

              {/* Buttons */}
              <div className="mt-8 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <a 
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="px-5 py-2.5 rounded-lg bg-teal-50 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-400/20 hover:bg-teal-100 dark:hover:bg-teal-400/20 transition-all text-sm font-medium hover:scale-105 active:scale-95"
                >
                  View Projects
                </a>
                <a 
                  href="/resume.pdf" 
                  className="px-5 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all text-sm font-medium hover:scale-105 active:scale-95"
                >
                  Resume
                </a>
              </div>
              
              {/* Nav */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {NAV_LINKS.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`group flex items-center py-3 transition-all cursor-pointer ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                      >
                        <span className={`mr-4 h-px w-8 transition-all group-hover:w-16 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 ${activeSection === link.href.substring(1) ? 'w-16 bg-neutral-900 dark:bg-neutral-100' : 'bg-neutral-400 dark:bg-neutral-600'}`}></span>
                        <span className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-100 ${activeSection === link.href.substring(1) ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-500'}`}>
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Socials */}
            <ul className="flex items-center gap-5 mt-8" aria-label="Social media">
              {SOCIALS.map((social) => {
                const Icon = Icons[social.icon as keyof typeof Icons] || Icons.ExternalLink;
                return (
                  <li key={social.platform} className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all hover:-translate-y-1 hover:scale-110"
                      aria-label={`${social.platform} (opens in a new tab)`}
                    >
                      <span className="sr-only">{social.platform}</span>
                      <Icon size={22} strokeWidth={1.5} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </header>

          {/* RIGHT COLUMN: Scrollable Content with Snapping (Disabled on mobile) */}
          <main 
            ref={scrollContainerRef}
            className="flex-1 h-full overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth scrollbar-hide relative z-10 lg:px-12"
          >
            {/* Mobile Header (Visible only on small screens) */}
            {/* Enriched with full details to match desktop sidebar */}
            <div className="lg:hidden pt-24 px-6 mb-12 flex flex-col items-start animate-fade-in">
                <div className="mb-6 relative group w-max">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <img 
                        src={PROFILE_IMAGE}
                        alt="Badrish MS" 
                        className="relative w-28 h-28 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-teal-50 dark:bg-teal-400/10 border border-teal-200 dark:border-teal-400/20 text-teal-700 dark:text-teal-300 text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    Available for work
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Badrish MS</h1>
                <h2 className="mt-2 text-lg font-medium text-neutral-800 dark:text-neutral-200">Data Engineer & Creative Technologist</h2>
                
                <p className="mt-6 max-w-md leading-relaxed text-neutral-600 dark:text-neutral-400">
                    I build pixel-perfect, data-driven digital experiences using modern cloud architecture.
                </p>
                
                <div className="mt-6 flex flex-col items-start gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm text-xs font-medium text-neutral-600 dark:text-neutral-400 shadow-sm">
                    <Icons.MapPin size={14} className="text-teal-600 dark:text-teal-400" />
                    <span>Bremen, Germany 🇩🇪</span>
                    </div>
                    <WeatherWidget />
                    <TimeWidget />
                </div>

                <div className="mt-8 flex items-center gap-4 w-full sm:w-auto">
                    <a 
                        href="#projects"
                        onClick={(e) => handleNavClick(e, '#projects')}
                        className="px-5 py-2.5 rounded-lg bg-teal-50 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-400/20 hover:bg-teal-100 dark:hover:bg-teal-400/20 transition-all text-sm font-medium active:scale-95"
                    >
                        View Projects
                    </a>
                    <a 
                        href="/resume.pdf" 
                        className="px-5 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all text-sm font-medium active:scale-95"
                    >
                        Resume
                    </a>
                </div>

                <div className="mt-8 flex gap-5">
                    {SOCIALS.map((social) => {
                    const Icon = Icons[social.icon as keyof typeof Icons] || Icons.ExternalLink;
                    return (
                        <a 
                            key={social.platform} 
                            href={social.url} 
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                        <Icon size={22} />
                        </a>
                    );
                    })}
                </div>
            </div>
            
            {/* About Section */}
            <Section id="about">
              <motion.div variants={staggerContainer}>
                <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-4 bg-neutral-100/75 dark:bg-neutral-950/75 px-6 py-5 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">About</h2>
                </div>
                <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8 hidden lg:block">About</motion.h2>
                <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg space-y-6">
                  <motion.p variants={fadeInUp}>
                    I am currently pursuing my M.Sc. in <span className="text-neutral-900 dark:text-neutral-100 font-medium bg-teal-500/10 px-1 rounded">Data Engineering</span> at Constructor University in Bremen, Germany. My journey started with Mechanical Engineering, but my curiosity for patterns and predictions led me to the world of Data and Software.
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    {BIO}
                  </motion.p>
                  <motion.p variants={fadeInUp}>
                    I hold an <span className="text-teal-600 dark:text-teal-300 font-medium">AWS Certified Data Engineer – Associate</span> credential and specialize in building pipelines that move seamlessly from development to production.
                  </motion.p>
                </div>
              </motion.div>
            </Section>

            {/* Projects Section */}
            <Section id="projects">
              <motion.div variants={staggerContainer}>
                <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-8 bg-neutral-100/75 dark:bg-neutral-950/75 px-6 py-5 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">Projects</h2>
                </div>
                <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-12 hidden lg:block">Selected Projects</motion.h2>

                <motion.div variants={fadeInUp}>
                  <GithubCard username="baddy1411" />
                </motion.div>
                
                <div className="flex flex-col gap-8">
                  {PROJECTS.map((project, index) => {
                    const ProjectIcon = Icons[project.icon as keyof typeof Icons] || Icons.Github;
                    return (
                      <motion.div key={index} variants={fadeInUp} className="group relative grid gap-4 sm:grid-cols-8 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:block lg:group-hover:bg-neutral-100 dark:lg:group-hover:bg-neutral-800/30 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"></div>
                        
                        <div className="z-10 sm:col-span-2 mt-1">
                          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 h-16 w-16 flex items-center justify-center group-hover:border-teal-500/30 transition-colors">
                            <ProjectIcon size={24} className="text-neutral-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                          </div>
                        </div>

                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-neutral-900 dark:text-neutral-100 text-lg">
                            <a href={project.link} target="_blank" rel="noreferrer" className="group/link inline-flex items-center">
                              <span className="absolute -inset-4 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                {project.title}
                              </span>
                              <Icons.ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                            </a>
                          </h3>
                          <p className="mt-3 text-sm leading-normal text-neutral-600 dark:text-neutral-400">
                            {project.description}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                            {project.tech.map((t) => (
                              <li key={t}>
                                <div className="flex items-center rounded-full bg-teal-50 dark:bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300">
                                  {t}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </Section>

            {/* Experience Section */}
            <Section id="experience">
              <motion.div variants={staggerContainer}>
                <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-8 bg-neutral-100/75 dark:bg-neutral-950/75 px-6 py-5 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">Experience</h2>
                </div>
                <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-12 hidden lg:block">Experience</motion.h2>
                
                <div className="flex flex-col gap-12">
                  {EXPERIENCE.map((job, index) => (
                    <motion.div key={index} variants={fadeInUp} className="group relative grid sm:grid-cols-8 gap-4 transition-all">
                      <div className="absolute -inset-4 z-0 hidden rounded-xl transition lg:block lg:group-hover:bg-neutral-100 dark:lg:group-hover:bg-neutral-800/30"></div>
                      
                      <header className="z-10 sm:col-span-2 flex flex-col items-start" aria-label={job.period}>
                        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">{job.period}</span>
                        <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800">
                          <img 
                              src={`https://logo.clearbit.com/${job.logo}`} 
                              alt={`${job.company} logo`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                              }}
                          />
                        </div>
                      </header>
                      
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-neutral-900 dark:text-neutral-100 text-lg">
                          <div>
                            <span className="absolute -inset-4 hidden rounded lg:block"></span>
                            <span>
                              {job.role}
                            </span>
                            <span className="block text-teal-600 dark:text-teal-300 text-sm font-normal mt-1">{job.company}</span>
                          </div>
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {job.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div variants={fadeInUp} className="mt-12">
                  <a 
                    ref={buttonRef}
                    href="/resume.pdf" 
                    onMouseMove={handleButtonMouseMove}
                    onMouseLeave={handleButtonMouseLeave}
                    style={{ transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)` }}
                    className="group inline-flex items-center font-semibold text-neutral-900 dark:text-neutral-100 hover:text-teal-600 dark:hover:text-teal-300 transition-all"
                  >
                    <span className="border-b border-transparent pb-px group-hover:border-teal-600 dark:group-hover:border-teal-300">View Full Resume</span>
                    <Icons.ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </motion.div>
              </motion.div>
            </Section>

            {/* Certifications Section */}
            <Section id="certifications">
              <motion.div variants={staggerContainer}>
                <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-8 bg-neutral-100/75 dark:bg-neutral-950/75 px-6 py-5 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">Certifications</h2>
                </div>
                <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-12 hidden lg:block">Certifications</motion.h2>

                <div className="flex flex-col gap-8">
                  {CERTIFICATIONS.map((cert, index) => (
                    <motion.div key={index} variants={fadeInUp} className={`group relative grid sm:grid-cols-8 gap-4 transition-all ${!cert.link && !cert.verificationId ? 'opacity-70' : ''}`}>
                      <div className="absolute -inset-4 z-0 hidden rounded-xl transition lg:block lg:group-hover:bg-neutral-100 dark:lg:group-hover:bg-neutral-800/30"></div>
                      <header className="z-10 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:col-span-2 pt-1">
                        {cert.date}
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-neutral-900 dark:text-neutral-100 text-lg">
                          {cert.link ? (
                              <a href={cert.link} target="_blank" rel="noreferrer" className="group/link inline-flex items-center">
                                <span className="absolute -inset-4 hidden rounded lg:block"></span>
                                <span>{cert.name}</span>
                                <Icons.ArrowUpRight className="ml-2 h-4 w-4 opacity-50 group-hover/link:opacity-100 transition-all group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                              </a>
                          ) : (
                              <span className="text-neutral-500 dark:text-neutral-500 italic">{cert.name}</span>
                          )}
                        </h3>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                          Issued by {cert.issuer}
                        </p>

                        {cert.verificationId && (
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="relative z-20 inline-flex items-center gap-2 pl-3 pr-1 py-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                              <span>ID: {cert.verificationId}</span>
                              <button 
                                onClick={() => handleCopy(cert.verificationId!)}
                                className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors"
                                title="Copy ID"
                              >
                                {copiedId === cert.verificationId ? (
                                  <Icons.Check size={14} className="text-green-500" />
                                ) : (
                                  <Icons.Copy size={14} />
                                )}
                              </button>
                            </div>
                            <a 
                              href="https://aws.amazon.com/verification" 
                              target="_blank" 
                              rel="noreferrer"
                              className="relative z-20 inline-flex items-center gap-1.5 text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline"
                            >
                              Verify Credential <Icons.ArrowUpRight size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Section>

            {/* Hiring / Recruiter Section */}
            <Section id="hiring">
              <motion.div variants={staggerContainer}>
                <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-8 bg-neutral-100/75 dark:bg-neutral-950/75 px-6 py-5 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">Hiring</h2>
                </div>
                
                <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8 hidden lg:block">{RECRUITER_CONTENT.headline}</motion.h2>
                
                <motion.div variants={fadeInUp} className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 transition-all hover:border-teal-500/30">
                  <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                    {RECRUITER_CONTENT.subheadline}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {RECRUITER_CONTENT.offerings.map((offer, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                          {offer.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {offer.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800/50">
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Ready to chat?</h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Let's discuss how I can contribute to your engineering team.
                      </p>
                    </div>
                    <a 
                      href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting+with+Badrish+MS&details=Discussion+via+Portfolio&add=badrish41@gmail.com" 
                      target="_blank"
                      rel="noreferrer"
                      className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-all hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
                    >
                      <Icons.Video size={16} />
                      Schedule Meeting
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </Section>

            {/* Skills & Contact */}
            <Section id="contact">
              <motion.div variants={staggerContainer}>
                <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-8 bg-neutral-100/75 dark:bg-neutral-950/75 px-6 py-5 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">Contact</h2>
                </div>
                
                <div className="mb-16">
                  <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8 hidden lg:block">Technical Arsenal</motion.h2>
                  <motion.div variants={fadeInUp}>
                    <SkillGrid />
                  </motion.div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                      <motion.h2 variants={fadeInUp} className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Get In Touch</motion.h2>
                  </div>
                  <motion.div variants={fadeInUp}>
                    <ContactForm />
                  </motion.div>
                </div>

                <motion.footer variants={fadeInUp} className="py-12 text-sm text-neutral-500">
                  <p>
                    Built with <span className="text-neutral-900 dark:text-neutral-200">React</span>, <span className="text-neutral-900 dark:text-neutral-200">Tailwind CSS</span>, and <span className="text-neutral-900 dark:text-neutral-200">Google Gemini</span>.
                  </p>
                  <p className="mt-2">
                    &copy; {new Date().getFullYear()} Badrish MS
                  </p>
                </motion.footer>
              </motion.div>
            </Section>

          </main>
      </div>
      
      <ChatWidget />
    </div>
  );
}

export default App;
