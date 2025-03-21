import React, { useEffect } from 'react';

const AdminHome = () => {

  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  useEffect(() => {
    scrollToTop()
  },[])
 
  return (
    <div className='p-4'>
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">SEO Performance</h2>
        <p>Display SEO charts and data here.</p>
      </div>
    </div>
  );
};

export default AdminHome;
