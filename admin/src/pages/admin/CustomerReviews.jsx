import React, { useEffect } from "react";
import { getAllReviews } from "../../backend/manageRewiew";
import DeleteReviewButton from "../../Componets/admin/DeleteReviewButton";
import { useRecoilState } from "recoil";
import { allReviewsAtom } from "../../Atoms/allReviewsAtom";

const CustomerReviews = () => {
  const [reviews, setReviews] = useRecoilState(allReviewsAtom);

  async function setUp() {
    if (reviews === null) {
      setReviews(await getAllReviews());
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    setUp();
    scrollToTop();
  }, [reviews]);

  return (
    <div className="p-2 sm:p-4 w-full overflow-x-auto">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">Customer Reviews</h1>
      <div className="bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg overflow-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left text-xs sm:text-sm border">Sr No</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left text-xs sm:text-sm border">Name</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left text-xs sm:text-sm border">Company Name</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left w-24 sm:w-40 text-xs sm:text-sm border">Photo</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left text-xs sm:text-sm border">Description</th>
              <th className="py-2 px-1 sm:px-2 md:px-4 text-left text-xs sm:text-sm border">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review, index) => (
                <tr key={review.id} className="border">
                  <td className="py-2 px-1 sm:px-2 md:px-4 text-xs sm:text-sm border">{index + 1}</td>
                  <td className="py-2 px-1 sm:px-2 md:px-4 text-xs sm:text-sm border truncate max-w-[80px] sm:max-w-[120px]">{review.name}</td>
                  <td className="py-2 px-1 sm:px-2 md:px-4 text-xs sm:text-sm border truncate max-w-[100px] sm:max-w-[150px]">{review.companyName}</td>
                  <td className="py-2 px-1 sm:px-2 md:px-4 border">
                    <img
                      src={review.photoUrl}
                      alt={review.name}
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg mx-auto"
                    />
                  </td>
                  <td className="py-2 px-1 sm:px-2 md:px-4 text-xs sm:text-sm border truncate max-w-[150px] sm:max-w-[200px]">{review.description}</td>
                  <td className="py-2 px-1 sm:px-2 md:px-4 text-xs sm:text-sm border">
                    <DeleteReviewButton
                      imgUrl={review.photoUrl}
                      reviewId={review.id}
                      iconClass="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerReviews;
