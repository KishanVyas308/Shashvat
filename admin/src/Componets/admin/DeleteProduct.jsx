import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { productAtom } from "../../Atoms/productsAtom";
import { allProduct, deleteProduct } from "../../backend/manageProduct";
import { loadingAtom } from "../../Atoms/loadingAtom";
import Loading from "../Loading";

const DeleteProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [Products, setProducts] = useRecoilState(productAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)
  const dialogRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dialogRef.current.showModal(); // Show the confirmation dialog
  };

  const setAllProduct = async () => {
    setProducts(await allProduct());
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteProduct(selectedProductId)
    await setAllProduct()
    setIsLoading(false)
    dialogRef.current.close(); // Close the dialog after confirming
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // Close the dialog without confirming
  };

  return (
    <>
     {isLoading ? <Loading /> : <></>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
              console.log(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled>
              Select a product
            </option>
            {Products && Products.length > 0 ? (
              Products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No products available
              </option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Confirm Delete
        </button>
      </form>

      <dialog ref={dialogRef} className="rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={cancelDelete}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
};

export default DeleteProduct;
