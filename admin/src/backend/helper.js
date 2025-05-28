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


export async function updateImage(imageFile) {

  try {
    console.log("imageFile:", imageFile);
    
    const response = await axios.delete(`${backendUrl}/multer/image/${imageName.name}`);
    if (response.status === 204) {
      console.log("Image deleted successfully");
    } else {
      console.error("Failed to delete image");
      return false
    }
  } catch (error) {
    console.error("Image delete error:", error);
    return false
  }
  

  try {
    const response = await axios.put(`${backendUrl}/multer/upload`, imageFile);
    if (response.status === 204) {
      console.log("Image updated successfully");
      return response.data.imageUrl
    } else {
      console.error("Failed to update image");
      return false
    }
  } catch (error) {
    console.error("Image update error:", error);
    return false
  }
}


export async function deleteImage(selectedProductImg) {
  try {
    //  devide selectedProductImg to get image name at the end
    const imageName = selectedProductImg.split("/").pop();
    console.log("Image Name:", imageName); // Debugging line

    const response = await axios.delete(`${backendUrl}/multer/image/${imageName}`);
    if (response.status === 204) {
      console.log("Image deleted successfully");
      return true
    } else {
      console.error("Failed to delete image");
      return false
    }
  } catch (error) {
    console.error("Image delete error:", error);
    return false
  }
}