import axios from "axios";
import { backendUrl } from "../globle";
import { toast } from "react-toastify";

import { convertImageToBase64 } from "./helper";

export async function storeReview(review, imageFile) {
  try {
    let imageBase64 = "";

    if (imageFile) {
      // Convert image file to base64 string
      imageBase64 = await convertImageToBase64(imageFile, 800, 0.7);
    }

    const response = await axios.post(`${backendUrl}/reviews/add`, {
      ...review,
      img: imageBase64, // Send base64 string instead of file
    });

    if (response.status === 201) {
      toast.success("Review added successfully!");
    }
  } catch (error) {
    console.error("Error storing review:", error);
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