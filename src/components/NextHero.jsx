import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NextHero = () => {
  const [techs] = useState([
    {
      imageurl: '/assets/react.svg',
      tech: "React.JS",
    },
    {
      imageurl: '/assets/r3f.png',
      tech: "Three.JS",
    },
    {
      imageurl: '/assets/tailwindcss.svg',
      tech: "Tailwind CSS",
    },
    {
      imageurl: '/assets/gsap.svg',
      tech: "GSAP",
    },
    {
      imageurl: '/assets/javascript.svg',
      tech: "JavaScript",
    },
    {
      imageurl: '/assets/pton2.png',
      tech: "Python",
    }
  ]);

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

    contentTl.fromTo(".gsap-element",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

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
        scale: 30,
        duration: 1,
        opacity:0.4,
        ease: "power2.inOut",
      }
    );

    // Animation for tech stack heading
    const techStackTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-stack-heading",
        start: "top 70%",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });

    techStackTl.fromTo(".tech-stack-heading",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    return () => {
      contentTl.kill();
      dotTl.kill();
      techStackTl.kill();
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
        className={`flex gp-ele-${index} gap-1 border-[1px] border-zinc-800 flex-col justify-center items-center rounded-xl p-1 
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
        <div className="font-thin text-base hover:cursor-crosshair bg-black text-slate-200 py-1 px-4 rounded-s-full rounded-e-full
           transition-colors duration-300">
          {tech}
        </div>
      </div>
    );
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="w-full bg-[#1e1c1c] text-white relative ">
      <div className={`container mx-auto ${isMobile ? 'py-16 px-5' : 'py-44 px-24'}`}>
        <div className={`w-full h-[200vh] flex gap-2 ${isMobile ? 'flex-col' : 'flex-row'} justify-between relative`}>
          <div className="about-section relative z-10  w-[30%] text-2xl font-thin"><span className='h-fit w-fit span-section'>About Me</span>
            
          </div>
          <div className="animre bg-stone-950 absolute w-16 h-16 -top-2 left-5 rounded-full overflow-hidden z-0"></div>

          
          <div className="text-slate-400 text-xl font-thin flex flex-col gap-16 relative z-10">
            <div data-hoverable="true" className="gsap-element">
              Hi, I am Tanmay, a <span className="text-white">Developer</span> with
              excellent record and keen interest, looking for internship opportunity
              in a reputed organisation seeking to expand my Learning, Knowledge and
              Skills.
            </div>
            
            <div className="text-white text-2xl w-full text-center items-center flex flex-col gap-3 pt-5">
              <div className="tech-stack-heading bg-gradient-to-tr from-yellow-200 to-blue-600 via-red-500 bg-clip-text text-transparent">
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NextHero;