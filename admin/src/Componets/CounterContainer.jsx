import React, { useEffect, useState, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const Counter = ({ icon, title, value, colorClass, startCounting, description }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (startCounting) {
      const updateCount = () => {
        let start = 0;
        const end = parseInt(value, 10);
        if (start === end) return;

        let totalDuration = 3500;
        let incrementTime = (totalDuration / end) * 2;

        let timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, incrementTime);
      };

      updateCount();
    }
  }, [value, startCounting]);

  return (
    <div 
      className="relative bg-[#eef9ff] hover:bg-[#d9efff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 p-4 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`counter ${colorClass} p-12 bg-white  rounded-lg text-center relative overflow-hidden`}>
        <div className="counter-icon text-4xl mb-4">
          <i className={`fa ${icon}`}></i>
        </div>
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <span className="counter-value text-white bg-gradient-to-r from-blue-500 to-blue-700 text-3xl font-medium py-2 absolute bottom-0 left-0 w-full">
          {count}
        </span>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 rounded-lg">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

const CounterContainer = () => {
  const counters = [
    { icon: 'fa fa-users', title: 'Happy Clients', value: '500', colorClass: 'text-red-500', description: 'We Have More than 500 Happy Clients' },
    { icon: 'fa fa-globe', title: 'Different State Clients', value: '10', colorClass: 'text-orange-500', description: 'We Supply Our Products in more than  10 States ' },
    { icon: 'fa fa-box', title: 'Products Available', value: '50', colorClass: 'text-blue-500', description: 'We are Manufacture & Supply More than 100 Products' },
  ];

  const [startCounting, setStartCounting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto py-10 mt-5 rounded-2xl bg-[#eef9ff]" ref={containerRef}>
      <h2 className="text-center text-4xl font-bold mb-8 font-sans">Our Key <span className='text-blue-600'> Achievements </span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {counters.map((counter, index) => (
          <div
            className="p-4"
            key={index}
          >
            <Counter
              icon={counter.icon}
              title={counter.title}
              value={counter.value}
              colorClass={counter.colorClass}
              startCounting={startCounting}
              description={counter.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterContainer;