// Hero.jsx
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import resumePdf from '../assets/TanmayNawlakhe_Resume.pdf';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ParticleSkull } from './ParticleSkull';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
    const handleDownload = () => {
        const url = resumePdf;
        const link = document.createElement("a");
        link.href = url;
        link.download = "TanmayNawlakhe_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    useEffect(() => {
        // Always play the hero intro timeline on every page load.
        const tl = gsap.timeline();

        tl.fromTo(
            ".gsp-element",
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        tl.fromTo(
            ".gsp-element2",
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.5"
        );

        return () => tl.kill();
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', paddingTop: window.innerWidth < 768 ? '32vh' : '',
        }} className={` ${window.innerWidth < 768 ? 'px-5' : 'px-24'} relative `}>
            <Canvas className="transform md:translate-x-24" camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: window.innerWidth < 768 ? '50vh' : '100vh' 
 }}>
                <ParticleSkull />
                <OrbitControls
                    enableZoom={false}
                    autoRotate={true}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.13} />
                </EffectComposer>
            </Canvas>

            <div data-hoverable='true' className='top-[10%] md:top-[15%] flex flex-col justify-between h-[100vh] absolute'>
                <div className={`absolute top-0 transition-all duration-700 ease-in-out bg-gradient-to-tr from-yellow-300 to-blue-900 via-red-500 bg-clip-text text-transparent font-thin ${window.innerWidth < 768 ? 'text-5xl left-[10vw]' : 'text-8xl left-0'}
 gsp-element`}>    TANMAY A NAWLAKHE
 <p className="hero-text pt-3 md:pt-12 text-slate-400 text-lg md:text-2xl font-light mb-8 max-w-lg">
          Developer • Problem Solver • Innovator
        </p>
                </div>
                
                <div onClick={handleDownload} className={`absolute rounded-l-full rounded-r-full border-slate-400 border-[1px] py-3 px-6 md:w-[12vw] text-white gsp-element2 ${ window.innerWidth < 768 ? ' left-[10vw] bottom-32' : 'left-0 bottom-52'}`}>
                    Download Resume
                </div>

                {/* Scroll Indicator */}
        <div className="absolute md:left-[80vw] md:bottom-48 bottom-28 flex justify-center pointer-events-none left-[60vw] ">
            <div className="flex flex-col items-center gap-2  animate-bounce">
                <span className="text-xs font-light text-slate-300 tracking-widest uppercase">Scroll</span>
                <ChevronDown className="text-slate-400" size={24} />
            </div>
        </div>
            </div>
        </div>
    );
}