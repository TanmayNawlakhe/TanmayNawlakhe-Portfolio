import { useState, useEffect, useRef } from 'react'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from "./components/Hero"; 
import NextHero from "./components/NextHero";  
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import './App.css';  

gsap.registerPlugin(ScrollTrigger);

// components extracted to separate files: Experience, Projects, Education, Contact

const App = () => {   
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(40);
    const [isHoverable, setIsHoverable] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePos({ x, y });
      
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const canvasY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        const points = canvas.__r3f?.scene?.children?.find(child => child.type === 'Points');
        if (points?.material?.uniforms?.mousePos) {
          points.material.uniforms.mousePos.value.set(canvasX, canvasY);
        }
      }
    };

    const handleHover = (e) => {
            const hov = e.target.closest('[data-hoverable="true"]');
            setCursorSize(hov ? 100 : 40);
            setIsHoverable(Boolean(hov));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

    // Right-side scrub animation tied to the Experience section
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.experience-section',
                start: 'top 85%',
                end: 'bottom 20%',
                scrub: 1,
                markers: false,
            }
        });

        tl.fromTo('.exp-animre',
            { scale: 1, opacity: 0.9 },
            { scale: 20, opacity: 0.45, ease: 'power2.inOut' }
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <div className="relative bg-gradient-to-b from-[#1e1c1c] to-[#1e1c1c] ">
        <Hero />
        <NextHero />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </div>
      
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none mix-blend-difference z-[9999] will-change-transform"
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          transform: `translate3d(${mousePos.x - cursorSize/2}px, ${mousePos.y - cursorSize/2}px, 0)`,
          transition: 'transform 0.09s cubic-bezier(0.17, 0.67, 0.83, 0.67), width 0.2s ease, height 0.2s ease',
        }}
      >
                <div className="w-full h-full bg-white rounded-full opacity-90 relative">
                    {/* Center crosshair shown when hovering interactive items */}
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 ${isHoverable ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="relative" style={{width: 18, height: 18}}>
                            <div style={{width: '100%', height: 2, background: 'black'}} className="absolute left-0 top-1/2 -translate-y-1/2" />
                            <div style={{width: 2, height: '100%', background: 'black'}} className="absolute left-1/2 top-0 -translate-x-1/2" />
                        </div>
                    </div>
                </div>
      </div>
    </main>
  ); 
};

export default App;