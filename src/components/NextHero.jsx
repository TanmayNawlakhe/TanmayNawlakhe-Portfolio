import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { techs, langs } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const NextHero = () => {
  // techs and langs imported from data/skills.js

  useEffect(() => {
    // Animation for the main content
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gsap-element",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });

    // Animation for the background dot
    const dotTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".span-section",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        markers: false,
      }
    });

    dotTl.fromTo(".animre",
      {
        scale: 1,
        opacity:0.8,
      },
      {
        scale: 24,
        duration: 1,
        opacity:0.4,
        ease: "power2.inOut", 
      }
    );

    return () => {
      contentTl.kill();
      dotTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const TechBut = (imageurl, tech, index) => {
    const [first, setFirst] = useState(false);
    
    useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-stack-heading",
          start: "top 70%",
          toggleActions: "play none none reverse",
          markers: false,
        }
      });
  
      tl.fromTo(`.gp-ele-${index}`,
        {
          opacity: 0,
          x: 20,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.1,
        }
      );
  
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []); 

    return (
      <div
        key={`tech-${index}`}
        onClick={() => setFirst(true)}
        onMouseLeave={() => setFirst(false)}
        className={`flex gp-ele-${index} gap-1 border-[1px] border-zinc-800 bg-[#252323]/50 hover:bg-[#363434] flex-col justify-center items-center rounded-xl p-1 
          hover:border-slate-600 transition-colors duration-300`}
      >
        <div className="w-16 h-16 rounded-xl flex justify-center items-center p-2">
          <img
            className={`bg-transparent object-contain object-center transition-all duration-500 ease-in-out hover:cursor-crosshair 
            ${first ? 'rotate-180 scale-110' : ''}`}
            src={imageurl}
            alt={tech}
          />
        </div>
        <div className="font-thin text-base hover:cursor-crosshair bg-black/60 text-slate-200 py-1 px-4 rounded-s-full rounded-e-full
           transition-colors duration-300">
          {tech}
        </div>
      </div>
    );
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="w-full text-white relative ">
      <div className={`container mx-auto ${isMobile ? 'p-16 px-5' : 'p-28 px-24'}`}>
        <div className={`w-full h-fit pb-[5vh] flex gap-2 ${isMobile ? 'flex-col' : 'flex-row'} justify-between relative`}>
          <div className="about-section relative z-10  w-[40%] text-2xl font-thin "><span className='h-fit w-fit span-section border-b-[1px] border-slate-700 pb-2'>About Me</span>
            
          </div>

          <div className="animre bg-stone-950 absolute w-16 h-16 -top-2 -left-[10vw] rounded-full overflow-hidden z-0"></div>

          
          <div className="text-slate-400 text-xl font-thin flex flex-col gap-16 relative z-10">
            <div data-hoverable="true" className="gsap-element">
              Hi, I am Tanmay, a <span className="text-white">Developer</span> with
              excellent record and keen interest, looking for internship opportunity
              in a reputed organisation seeking to expand my Learning, Knowledge and
              Skills.
            </div>
            
            <div className="text-white text-2xl w-full text-center items-center flex flex-col gap-3 pt-5">
              <div className="tech-stack-heading bg-gradient-to-tr from-yellow-200  to-red-500 bg-clip-text text-transparent">
                My Technology Stack
              </div>
              <div className="w-[60%] text-base text-slate-400">
                My Tech fields are Web Development, Data Science, Machine Learning,
                and many more
              </div>
              <div className={`flex w-[80%] justify-center items-center flex-row flex-wrap gap-2 ${isMobile ? 'h-fit' : 'h-52'}`}>
                {techs.map((list, index) => (
                  TechBut(list.imageurl, list.tech, index)
                ))}
              </div>

              <div className="pt-16 w-[60%] text-base text-slate-400">
                Programming Languages Used
              </div>
              <div className={`flex w-[80%] justify-center items-center flex-row flex-wrap gap-2 `}>
                {langs.map((list, index) => (
                  TechBut(list.imageurl, list.tech, index)
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NextHero;