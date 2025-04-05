import axios from "axios";
import { backendUrl } from "../globle";
import { toast } from "react-toastify";

export async function storeReview(review, imageFile) {
  try {
    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadResponse = await axios.post(`${backendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imageUrl = uploadResponse.data.url;
    }

    const response = await axios.post(`${backendUrl}/reviews/add`, {
      ...review,
      img: imageUrl,
    });

    if (response.status === 201) {
      toast.success("Review added successfully!");
    }
  } catch (error) {
    toast.error("Something went wrong, Please refresh!!");
  }
}

export async function getAllReviews() {
  try {
    const response = await axios.get(`${backendUrl}/reviews/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return [];
  }
}

export async function deleteReview(reviewId) {
  try {
    const response = await axios.delete(`${backendUrl}/reviews/delete`, {
      data: { reviewId },
    });

    if (response.status === 200) {
      toast.success("Review deleted successfully!");
    }
  } catch (error) {
    console.error("Error deleting review: ", error);
    toast.error("Error in deleting review");
  }
}