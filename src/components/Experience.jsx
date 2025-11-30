import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceTags } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const expRef = useRef(null);

  useEffect(() => {
    const el = expRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 0%'
        }
      }
    );
  }, []);

  return (
    <div className="w-full text-white pb-24 px-6 md:px-24 experience-section relative">
      <div className={`container mx-auto transition-all duration-1000 relative z-10`} ref={expRef}>
        {/* background blob */}
        <div className="exp-animre absolute -right-[10vw] top-1/2 -translate-y-1/2 w-16 h-16 bg-stone-950/65 rounded-full z-0" />
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-[30%]">
            <h2 className="text-2xl font-thin border-b border-slate-700 pb-2 inline-block">Experience</h2>
          </div>
          <div className="md:w-[70%] border-l border-slate-800 pl-8 space-y-12">
            <div className="relative group">
              <div className="absolute -left-[2.4rem] top-2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform"></div>
              <h3 className="text-xl font-normal text-white">Student Intern</h3>
              <div className=" font-light mb-2">Siemens Digital Industries Software • Pune</div>
              <div className="text-sm text-slate-500 mb-4 font-mono">June 2025 - July 2025</div>
              <ul className="list-disc pl-5 text-slate-300 space-y-2 font-light text-sm md:text-base">
                <li>Worked on REST API Development in an Audit Logging System to monitor and debug errors in AWS-hosted Database Servers.</li>
                <li>Simplified data retrieval using BSON queries and MongoTemplate.</li>
                <li>Developed a Thread Monitoring System for Performance Testing with AWS S3 integration.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {experienceTags.map((tag) => (
                  <span key={tag} className="text-xs border border-slate-800 text-slate-400 px-2 py-1 rounded bg-slate-900/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
