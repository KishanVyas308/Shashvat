import React, { useEffect, useState } from 'react';
import CreateProduct from '../../Componets/admin/CreateProduct';
import UpdateProduct from '../../Componets/admin/UpdateProduct';
import DeleteProduct from '../../Componets/admin/DeleteProduct';

const ManageProducts = () => {
  const [selectedTab, setSelectedTab] = useState('create');


  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  useEffect(() => {
    scrollToTop()
  },[])
  return (
    <div  className='p-4'>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex mb-4">
        <button onClick={() => setSelectedTab('create')} className={`py-2 px-4 rounded ${selectedTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Create</button>
        <button onClick={() => setSelectedTab('update')} className={`py-2 px-4 rounded ml-2 ${selectedTab === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Update</button>
        <button onClick={() => setSelectedTab('delete')} className={`py-2 px-4 rounded ml-2 ${selectedTab === 'delete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Delete</button>
      </div>
      <div>
        {selectedTab === 'create' && <CreateProduct />}
        {selectedTab === 'update' && <UpdateProduct />}
        {selectedTab === 'delete' && <DeleteProduct />}
      </div>
    </div>
  );
};

export default ManageProducts;
