import React, { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { allProduct, deleteProduct } from "../../backend/manageProduct";
import { useRecoilState } from "recoil";
import { productAtom } from "../../Atoms/productsAtom";
import { loadingAtom } from "../../Atoms/loadingAtom";
import Loading from "../Loading";

const DeleteProductButton = ({ productId, imgUrl }) => {
  const [Products, setProducts] = useRecoilState(productAtom);
  const dialogRef = useRef(null);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)


  const handleSubmit = (e) => {
    e.preventDefault();
    dialogRef.current.showModal(); // Show the confirmation dialog
  };

  const setAllProduct = async () => {
    setProducts(await allProduct());
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    dialogRef.current.close(); 
    await deleteProduct(productId, imgUrl);
    await setAllProduct();
    setIsLoading(false);
  
    // Close the dialog after confirming
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // Close the dialog without confirming
  };
  return (
    <> 
      <div
        className="text-[18px] p-2 rounded-md bg-red-300 bg-opacity-90 hover:bg-red-300 cursor-pointer"
        onClick={handleSubmit}
      >
        <MdDeleteOutline className="text-red-600" />
      </div>
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

export default DeleteProductButton;
