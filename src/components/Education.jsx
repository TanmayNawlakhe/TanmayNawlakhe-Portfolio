import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const eduRef = useRef(null);

  useEffect(() => {
    const el = eduRef.current;
    if (!el) return;

    const heading = el.querySelector('h2');
    const items = el.querySelectorAll('.edu-item');

    if (heading) {
      gsap.fromTo(heading, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        }
      });
    }

    if (items && items.length) {
      gsap.fromTo(items, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        }
      });
    }
  }, []);

  return (
    <div className="w-full text-white pb-24 px-6 md:px-24">
      <div className={`container mx-auto transition-all duration-1000`} ref={eduRef}>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-[30%]">
            <h2 className="text-2xl font-thin border-b border-slate-700 pb-2 inline-block">Education</h2>
          </div>
          <div className="md:w-[70%] border-l border-slate-800 pl-8 space-y-12">
            {/* Item 1 */}
            <div className="relative group edu-item">
              <div className="absolute -left-[2.4rem] top-2 w-3 h-3 bg-emerald-700 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform"></div>
              <h3 className="text-xl font-normal text-white">B.E. in Information Technology</h3>
              <div className="font-light mb-2">Pune Institute of Computer Technology (PICT), Pune</div>
              <div className="text-sm text-slate-500 mb-2 font-mono">2023 - 2027</div>
              <div className="text-slate-300 font-light text-sm md:text-base">Current CGPA: 9.45</div>
            </div>
            {/* Item 2 */}
            <div className="relative group edu-item">
              <div className="absolute -left-[2.4rem] top-2 w-3 h-3 bg-emerald-700 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-all"></div>
              <h3 className="text-xl font-normal text-white">Higher Secondary Certificate (12th Grade)</h3>
              <div className="font-light mb-2">Lal Bahadur Shastri Junior College, Bhandara</div>
              <div className="text-sm text-slate-500 mb-2 font-mono">2023</div>
              <div className="text-slate-300 font-light text-sm md:text-base">Passed with 88.17%</div>
            </div>
            {/* Item 3 */}
            <div className="relative group edu-item">
              <div className="absolute -left-[2.4rem] top-2 w-3 h-3 bg-emerald-700 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-all"></div>
              <h3 className="text-xl font-normal text-white">Secondary School Certificate (10th Grade)</h3>
              <div className=" font-light mb-2">Lal Bahadur Shastri Vidyalaya, Bhandara</div>
              <div className="text-sm text-slate-500 mb-2 font-mono">2021</div>
              <div className="text-slate-300 font-light text-sm md:text-base">Passed with 100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
