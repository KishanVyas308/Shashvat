import axios from "axios";
import { backendUrl } from "../globle";
import { toast } from "react-toastify";

import { uploadImageAndGetUrl } from "./helper";

export async function storeReview(review, imageFile) {
  try {
    let imageUrl = "";

    if (imageFile) {
      // Upload image and get its URL
      imageUrl = await uploadImageAndGetUrl(imageFile);
    }

    const response = await axios.post(`${backendUrl}/reviews/add`, {
      ...review,
      img: imageUrl, // Send image URL instead of base64 string
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