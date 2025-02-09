// Hero.jsx
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';

function ParticleSkull() {
    const { scene } = useGLTF('/tmp68kvobx1.glb');
    const [points, setPoints] = useState(null);
    const pointsRef = useRef();
    const originalPositions = useRef();
    const mousePosition = useRef({ x: -1000, y: -1000 });
    const scrollPosition = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            scrollPosition.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!scene) return;

        scene.rotation.y = Math.PI;

        const box = new THREE.Box3().setFromObject(scene);
        const minY = box.min.y;
        const maxY = box.max.y;

        const vertices = [];
        const sizes = [];
        const totalParticles = 3000;
        const highlightedParticles = 50;

        scene.traverse((obj) => {
            if (obj.isMesh) {
                const sampler = new MeshSurfaceSampler(obj).build();
                const tempPosition = new THREE.Vector3();

                let count = 0;
                let attempts = 0;
                while (count < totalParticles && attempts < totalParticles * 10) {
                    attempts++;
                    sampler.sample(tempPosition);
                    const normalizedY = (tempPosition.y - minY) / (maxY - minY);
                    if (Math.random() < normalizedY) {
                        vertices.push(tempPosition.x * 2, tempPosition.y * 2, tempPosition.z * 2);
                        sizes.push(count < highlightedParticles ? 0.07 : 0.03);
                        count++;
                    }
                }
            }
        });

        originalPositions.current = [...vertices];

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) },
                mousePos: { value: new THREE.Vector2(-1000, -1000) },
                time: { value: 0 },
            },
            vertexShader: `
                attribute float size;
                uniform vec2 mousePos;
                uniform float time;
                varying vec3 vColor;

                void main() {
                    vColor = vec3(1.0, 1.0, 1.0);
                    
                    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
                    vec4 projectedPosition = projectionMatrix * viewPosition;
                    vec2 screenPosition = projectedPosition.xy / projectedPosition.w;
                    
                    vec3 finalPosition = position;
                    float effectRange = 0.3;
                    float repulsionStrength = 0.5;
                    
                    float dist = distance(screenPosition, mousePos);
                    if (dist < effectRange) {
                        vec2 repulsionVector = normalize(screenPosition - mousePos);
                        float repulsionFactor = repulsionStrength * (1.0 - dist / effectRange);
                        repulsionFactor *= repulsionFactor;
                        finalPosition.xy += repulsionVector * repulsionFactor;
                    }
                    
                    gl_PointSize = size * (300.0 / -viewPosition.z);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    gl_FragColor = vec4(vColor, 1.0);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        points.rotation.y = Math.PI;

        setPoints(points);
        pointsRef.current = points;
    }, [scene]);

    useEffect(() => {
        if (!pointsRef.current) return;

        let animationFrameId;
        let time = 0;

        const animate = () => {
            time += 0.01;

            const positions = pointsRef.current.geometry.attributes.position.array;
            const original = originalPositions.current;
            
            const scrollFactor = Math.min(scrollPosition.current / 500, 1);
            const vibrationIntensity = scrollFactor * 4;

            for (let i = 0; i < positions.length; i += 3) {
                const noise = (Math.random() - 0.5) * vibrationIntensity;
                positions[i] = THREE.MathUtils.lerp(
                    positions[i],
                    original[i] + noise,
                    0.02
                );
                positions[i + 1] = THREE.MathUtils.lerp(
                    positions[i + 1],
                    original[i + 1] + noise,
                    0.02
                );
                positions[i + 2] = THREE.MathUtils.lerp(
                    positions[i + 2],
                    original[i + 2] + noise,
                    0.02
                );
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
            pointsRef.current.material.uniforms.time.value = time;

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!pointsRef.current) return;
    
            const canvas = event.currentTarget.querySelector('canvas');
            if (!canvas) return;
    
            const rect = canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
            mousePosition.current = { x, y };
            pointsRef.current.material.uniforms.mousePos.value.set(x, y);
        };
    
        const container = document.querySelector('.relative');
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return points ? <primitive object={points} /> : null;
}

export default function Hero() {
    const handleDownload = () => {
        const url = "/assets/TAN_Resume.pdf"; // Place file in the public folder
        const link = document.createElement("a");
        link.href = url;
        link.download = "TanmayNawlakhe_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gsp-element",
                start: "top 90%",
                end: "top 0%",
                toggleActions: "play reverse play reverse",
                markers: false,
            }
        });

        tl.fromTo(".gsp-element",
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }
        );

        tl.fromTo(".gsp-element2",
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "-=0.5"
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '115vh', paddingTop: window.innerWidth < 768 ? '30vh' : '8vh',
        }} className={` ${window.innerWidth < 768 ? 'px-5' : 'px-24'} relative bg-[#1e1c1c]`}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: window.innerWidth < 768 ? '50vh' : '105vh' 
 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} />
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

            <div data-hoverable='true' className='top-[15%] flex flex-col justify-between h-[100vh] absolute'>
                <div className={`absolute top-0 transition-all duration-700 ease-in-out bg-gradient-to-tr from-yellow-300 to-blue-900 via-red-500 bg-clip-text text-transparent font-thin ${window.innerWidth < 768 ? 'text-5xl left-[10vw]' : 'text-7xl left-0'}
 gsp-element`}>    TANMAY A NAWLAKHE
                </div>
                <div onClick={handleDownload} className={`absolute cursor-pointer border-slate-400 border-[1px] py-2 px-4 text-white bg-gradient-to-l bottom-52 gsp-element2 ${ window.innerWidth < 768 ? ' left-[30vw]' : 'left-0'}`}>
                    Resume
                </div>
            </div>
        </div>
    );
}