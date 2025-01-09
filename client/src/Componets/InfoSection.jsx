import React from 'react';
import InfoCard from './InfoCard';
import { FaBuilding, FaRocket, FaCogs } from 'react-icons/fa';

const InfoSection = () => {
  const infoData = [
    {
      icon: <FaBuilding />,
      title: 'Infrastructure',
      description: 'We have a state-of-the-art infrastructure where all of our business activities including manufacturing, quality analysis, material handling, warehousing, order fulfillment, etc. are adroitly managed by our skilled and experienced employees. Our quality control experts conduct strict quality checks of our manufactured products.',
    },
    {
      icon: <FaRocket />,
      title: 'Our Customer',
      description: 'Our company\'s guiding principles and our industry expertise allow us to grow successfully establishing a distinct place in the industry. We ensure to serve all of our customers across the nation with the special attention they deserve.',
    },
    {
      icon: <FaCogs />,
      title: 'Products',
      description: 'At Shashvat Brass Industries, we offer world-class brass flare fittings, brass anchors, brass inserts, brass pipe fittings, brass hardware fittings, brass mixer grinders, and many more. With a wide assortment of brass products, we have made it easy for our customers to choose the suitable one as per their requirements.',
    },
  ];

  return (
    <div className="bg-[#eef9ff] pt-10 rounded-3xl">
     

      <div className="container mx-auto py-4  flex flex-col items-center rounded-lg ">
        <h2 className="text-center text-4xl font-bold mb-8 font-sans">Our Core <span className='text-blue-600'> Competencies</span></h2>
        <div className="flex flex-wrap justify-center px-4 w-full">
          {infoData.map((info, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <InfoCard
                icon={info.icon}
                title={info.title}
                description={info.description}
              />
            </div>
          ))}
        </div>
      </div>
     

    </div>
  );
};

export default InfoSection;