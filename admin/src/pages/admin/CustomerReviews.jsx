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
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Customer Reviews</h1>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Sr No</th>
              <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Name</th>
              <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Company Name</th>
              <th className="py-2 px-2 md:px-4 text-left w-40 text-xs md:text-sm">Photo</th>
            
              <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Description</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review, index) => (
                <tr key={review.id} className="border-b">
                  <td className="py-2 px-2 md:px-4 text-xs md:text-sm">{index + 1}</td>
                  <td className="py-2 px-2 md:px-4 text-xs md:text-sm">{review.name}</td>
                  <td className="py-2 px-2 md:px-4 text-xs md:text-sm">{review.companyName}</td>
                  <td className="py-2 px-2 md:px-4">
                    <img
                      src={review.photoUrl}
                      alt={review.name}
                      className="h-16 w-16 md:h-20 md:w-20 rounded-lg mx-auto"
                    />
                  </td>
            
                  <td className="py-2 px-2 md:px-4 text-xs md:text-sm">{review.description}</td>
                  <td className="py-2 px-2 md:px-4">
                    <DeleteReviewButton
                      imgUrl={review.photoUrl}
                      reviewId={review.id}
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
