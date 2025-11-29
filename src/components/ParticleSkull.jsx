import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

export function ParticleSkull() {
    // 1. Load the model (Ensure path is correct for your public folder)
    const { scene } = useGLTF('/tmp68kvobx1.glb');
    const [points, setPoints] = useState(null);
    const pointsRef = useRef();
    const originalPositions = useRef();
    const mousePosition = useRef({ x: -1000, y: -1000 });
    const scrollPosition = useRef(0);

    // 2. Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            scrollPosition.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. Generate Particles from Mesh
    useEffect(() => {
        if (!scene) return;

        scene.rotation.y = Math.PI;

        const box = new THREE.Box3().setFromObject(scene);
        const minY = box.min.y;
        const maxY = box.max.y;

        const vertices = [];
        const sizes = [];
        const totalParticles = 1800;
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
                    // Distribution logic: more particles at the top
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

    // 4. Animation Loop
    useEffect(() => {
        if (!pointsRef.current) return;

        let animationFrameId;
        let time = 0;

        const animate = () => {
            time += 0.02;

            const positions = pointsRef.current.geometry.attributes.position.array;
            const original = originalPositions.current;
            
            // Calculate scroll impact
            // CHANGE: Increased divisor (500 -> 1000) to reduce sensitivity. 
            // You now need to scroll more to get the effect to start ramping up.
            const scrollFactor = scrollPosition.current / 3000;
            
            // CHANGE: Decreased multiplier (15.0 -> 6.0)
            // This reduces the maximum distance the particles will fly apart.
            const spreadRadius = scrollFactor * 6.0; 

            for (let i = 0; i < positions.length; i += 3) {
                const uniquePhase = i * 0.13; 

                const noiseX = Math.sin(time + uniquePhase) * spreadRadius;
                const noiseY = Math.cos(time + uniquePhase * 0.9) * spreadRadius;
                const noiseZ = Math.sin(time + uniquePhase * 1.2) * spreadRadius;

                positions[i] = THREE.MathUtils.lerp(
                    positions[i],
                    original[i] + noiseX,
                    0.05 
                );
                positions[i + 1] = THREE.MathUtils.lerp(
                    positions[i + 1],
                    original[i + 1] + noiseY,
                    0.05
                );
                positions[i + 2] = THREE.MathUtils.lerp(
                    positions[i + 2],
                    original[i + 2] + noiseZ,
                    0.05
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

    // 5. Mouse Interaction
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!pointsRef.current) return;

            // Fallback to finding canvas if currentTarget isn't one
            const canvas = event.target.closest('canvas') || document.querySelector('canvas');
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            mousePosition.current = { x, y };
            pointsRef.current.material.uniforms.mousePos.value.set(x, y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return points ? <primitive object={points} /> : null;
}