import { useState, useEffect, useRef } from 'react'; 
import Hero from "./components/Hero"; 
import NextHero from "./components/NextHero";  
import './App.css';  

const App = () => {   
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(40);
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
      const isHoverable = e.target.closest('button, a, [data-hoverable="true"]');
      setCursorSize(isHoverable ? 100 : 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <div className="relative">
        <Hero />
        <NextHero />
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
        <div className="w-full h-full bg-white rounded-full opacity-90" />
      </div>
    </main>
  ); 
};

export default App;