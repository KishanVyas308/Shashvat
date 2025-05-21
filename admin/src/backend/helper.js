import axios from "axios";
import { backendUrl } from "../globle";




export async function uploadImageAndGetUrl(imageFile) {
  try {
    if (!imageFile) throw new Error("No image file provided");

    const formData = new FormData();
    formData.append("file", imageFile); // 'file' must match backend field name

    const response = await axios.post(`${backendUrl}/multer/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 && response.data.imageUrl) {
      console.log("Uploaded Image URL:", response.data.imageUrl);
      return response.data.imageUrl;
    } else {
      throw new Error("Failed to retrieve image URL");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
}
