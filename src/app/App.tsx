import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  const handleLoaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#07070d",
        color: "#f0f0f5",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Subtle noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <>
          <Navigation />
          <main className="relative">
            <Hero />
            <About />
            <TechStack />
            <Experience />
            <Projects />
            <Contact />
          </main>
        </>
      )}

      <style>{`
        @media (min-width: 769px) {
          * {
            cursor: none !important;
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(129,140,248,0.15);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(129,140,248,0.25);
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(129,140,248,0.15) transparent;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(99,102,241,0.25);
          color: #f0f0f5;
        }
      `}</style>
    </div>
  );
}