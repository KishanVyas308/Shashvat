import React from 'react';

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center h-full transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-500 text-white rounded-full text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default InfoCard;
