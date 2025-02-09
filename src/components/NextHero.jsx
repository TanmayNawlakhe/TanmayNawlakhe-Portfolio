import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const NextHero = () => {
  const [techs, setTechs] = useState([
    {
      imageurl: '/assets/react.svg',
      tech: "React.JS",
    },
    {
      imageurl: 'public/assets/r3f.png',
      tech: "Three.JS",
    },
    {
      imageurl: 'public/assets/tailwindcss.svg',
      tech: "Tailwind CSS",
    },
    {
      imageurl: 'public/assets/gsap.svg',
      tech: "GSAP",
    },
    {
      imageurl: 'public/assets/javascript.svg',
      tech: "JavaScript",
    },
    {
      imageurl: 'public/assets/pton2.png',
      tech: "Python",
    },
    {
      imageurl: 'public/assets/r3f.png',
      tech: "Three.JS",
    },
    {
      imageurl: 'public/assets/tailwindcss.svg',
      tech: "Tailwind CSS",
    },
    {
      imageurl: 'public/assets/gsap.svg',
      tech: "GSAP",
    },
    {
      imageurl: 'public/assets/javascript.svg',
      tech: "JavaScript",
    },
    {
      imageurl: 'public/assets/pton2.png',
      tech: "Python",
    },
  ]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gsap-element",
        start: "top 75%", // Triggers when element's top reaches 80% of viewport height
        end: "top 50%",
        toggleActions: "play none none reverse",
        markers: false, // Set to true for debugging
      }
    });

    tl.fromTo(".gsap-element",
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

    
    return () => {
      tl.kill();
    };
  }, []); 


  const TechBut = (imageurl, tech, index) => {
    const [first, setFirst] = useState(false);
    
    useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-element",
          start: "top 50%", // Triggers when element's top reaches 80% of viewport height
          end: "top 50%",
          toggleActions: "play none play reverse",
          markers: false, // Set to true for debugging
        }
      });
  
      tl.fromTo(`.gp-ele-${index}`,
        {
          opacity: 0,
          x: 30, 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: index*0.2,
        },
      );
  
      return () => {
        tl.kill();
      };
    }, []); 

    return (
      <div
        onClick={() => setFirst(true)}
        onMouseMove={() => setFirst(false)}
        className={`flex gp-ele-${index} gap-1 border-[1px] border-black flex-col justify-center items-center rounded-xl p-1`}
      >
        <div className="w-16 h-16 rounded-xl flex justify-center items-center p-2">
          <img
            className={`bg-[#1e1c1c] object-contain object-center transition-all duration-500 ease-in-out hover:cursor-crosshair 
            ${first ? 'rotate-180 ' : ''}`}
            src={imageurl}
            alt="logo"
          />
        </div>
        <div className="font-thin text-base hover:cursor-crosshair bg-black text-slate-200 py-1 px-4 rounded-s-full rounded-e-full">
          {tech}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#1e1c1c] py-44 text-white px-24">
      <div className="w-full h-fit flex justify-between">
        <div className="w-[30%] text-2xl font-thin">About Me</div>
        <div className="text-slate-400 text-xl font-thin flex flex-col gap-16">
          <div data-hoverable="true" className=' gsap-element'>
            Hi, I am Tanmay, a <span className="text-white">Developer</span> with
            excellent record and keen interest, looking for internship opportunity
            in a reputed organisation seeking to expand my Learning, Knowledge and
            Skills.
          </div>
          <div className="text-white text-2xl w-full text-center items-center flex flex-col gap-3 pt-5">
            <div className='bg-gradient-to-tr from-yellow-200 to-blue-600 via-red-500 bg-clip-text text-transparent'>
              My Technology Stack
            </div>
            <div className="w-[60%] text-base text-slate-400">
              My Tech fields are Web Development, Data Science, Machine Learning,
              and many
            </div>
            <div className="flex w-[80%] gsap-element2 h-52 justify-center items-center flex-row flex-wrap gap-2">
              {techs.map((list, index) => (
                TechBut(list.imageurl, list.tech , index)
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextHero;