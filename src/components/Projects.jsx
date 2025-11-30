import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
import projects from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projRef = useRef(null);

  useEffect(() => {
    const el = projRef.current;
    if (!el) return;

    const heading = el.querySelector('h2');
    const cards = el.querySelectorAll('.project-card');

    if (heading) {
      gsap.fromTo(heading, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%'
        }
      });
    }

    if (cards && cards.length) {
      gsap.fromTo(cards, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%'
        }
      });
    }
  }, []);

  return (
    <div className="w-full text-white pt-8 pb-24 px-6 md:px-24">
      <div className={`container mx-auto transition-all duration-1000`} ref={projRef}>
        <div className="mb-16">
          <h2 className="text-2xl font-thin border-b border-slate-700 pb-2 inline-block">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} data-hoverable="true" className="project-card group relative z-20 bg-[#252323] p-6 rounded-2xl hover:bg-[#2a2828] transition-all duration-300 border border-transparent hover:border-slate-700 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800/50 rounded-lg text-slate-300 group-hover:text-blue-400 transition-colors">
                  {p.icon ? (
                    <img src={p.icon} alt={`${p.title} icon`} className="w-6 h-6 object-contain" />
                  ) : null}
                </div>
                <div className="flex gap-3">
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                      <Github size={18} />
                    </a>
                  ) : null}

                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                      <ExternalLink size={18} />
                    </a>
                  ) : null}
                </div>
              </div>
              <h3 className="text-lg font-medium mb-3 transition-colors">{p.title}</h3>
              <p className="text-slate-400 font-light text-sm mb-6 flex-grow">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.stack.map(s => (
                  <span key={s} className="text-xs text-cyan-400/60 border-[1px] border-blue-900 bg-indigo-950 bg-opacity-20 rounded-md py-1 px-2 font-mono">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
