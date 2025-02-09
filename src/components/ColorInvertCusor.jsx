import { useState, useEffect } from 'react';

const ColorInvertCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden cursor-none">
      {/* Demo content - replace with your actual content */}
      <div className="p-8 text-lg">
        <h1 className="text-4xl font-bold mb-4">Color Inverting Cursor Demo</h1>
        <p className="mb-4">Move your cursor around to see the effect!</p>
        <div className="grid grid-cols-3 gap-4">
          {['red', 'blue', 'green', 'yellow', 'purple', 'orange'].map((color, i) => (
            <div 
              key={i}
              className="h-32 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: color }}
            >
              {color}
            </div>
          ))}
        </div>
      </div>

      {/* Inverted circle cursor */}
      <div
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transform: `translate(${mousePos.x - 50}px, ${mousePos.y - 50}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default ColorInvertCursor;