import React, { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import {  deleteReview, getAllReviews } from "../../backend/manageRewiew";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../Atoms/loadingAtom";
import Loading from "../Loading";
import { allReviewsAtom } from "../../Atoms/allReviewsAtom";

const DeleteReviewButton = ({ reviewId, imgUrl }) => {
  const dialogRef = useRef(null);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const [reviews, setReviews] = useRecoilState(allReviewsAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    dialogRef.current.showModal(); // Show the confirmation dialog
  };



  const confirmDelete = async () => {
    setIsLoading(true);
    dialogRef.current.close();
    await deleteReview(reviewId, imgUrl);
    setReviews(await getAllReviews())
  
    setIsLoading(false);
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // Close the dialog without confirming
  };

  return (
    <>
      <div
        className="absolute text-[18px] p-2 rounded-md bg-red-300 bg-opacity-90 hover:bg-red-300 cursor-pointer"
        onClick={handleSubmit}
      >
        <MdDeleteOutline className="text-red-600" />
      </div>
      <dialog ref={dialogRef} className="rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this review?</p>
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
      {isLoading && <Loading />} {/* Show loading spinner if isLoading is true */}
    </>
  );
};

export default DeleteReviewButton;
