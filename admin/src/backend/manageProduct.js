import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../globle";

import { uploadImageAndGetUrl, deleteImage, updateImage } from "./helper";

export async function addProduct(formData) {
  try {
    // Convert FormData to array of key-value objects
    const simpleDataArray = [];
    for (let [key, value] of formData.entries()) {
      simpleDataArray.push({ key, value });
    }


    for (let item of simpleDataArray) {
      if (item.key === "image" && (item.value instanceof File || item.value instanceof Blob)) {
        const imageurl = await uploadImageAndGetUrl(item.value);

        item.value = imageurl;
      }
    }

    // Convert array of objects to a single object
    const simpleDataObject = {};
    for (let { key, value } of simpleDataArray) {
      simpleDataObject[key] = value;
    }

    console.log("Final data to send:", simpleDataObject);

    const response = await axios.post(`${backendUrl}/products/add`, simpleDataObject, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("authToken"),
      },
    });

    toast.success("Product added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product. Please try again.");
  }
}

export async function allProduct() {
  try {
    const response = await axios.get(`${backendUrl}/products/all`);
    const products = response.data;
    // Convert base64 image strings to usable image URL

    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to fetch products. Please try again.");
    return null;
  }
}


export async function deleteProduct(productId, selectedProductImg) {
  try {

    if (selectedProductImg) {
      const isDeleted = await deleteImage(selectedProductImg);
      if (!isDeleted) {
        toast.error("Failed to delete image. Please try again.");
        return;
      }
    }

    const response = await axios.delete(`${backendUrl}/products/delete`, {
      data: { productId },
      headers: {
        "x-auth-token": localStorage.getItem("authToken"),
      },
    });

    toast.success("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product. Please try again.");
  }
}

export async function updateProduct(formData) {
  try {
    // Convert FormData to array of key-value pairs
    const simpleDataArray = [];
    for (let [key, value] of formData.entries()) {
      simpleDataArray.push({ key, value });
    }

   // update if image is not same
    console.log("image data:", formData.get("image"));
    console.log("original image data:", formData.get("originalimg"));

    const isImageChanged = formData.get("image") !== formData.get("originalimg");

    console.log("isImageChanged:", isImageChanged);
    
    if (isImageChanged) {
      const isUpdated = await updateImage(formData.get("image"));
      if (!isUpdated) {
        toast.error("Failed to update image. Please try again.");
        return;
      }
    }


    // Convert image field to base64 if it's a File
    for (let item of simpleDataArray) {
      if (item.key === "image" && (item.value instanceof File || item.value instanceof Blob)) {
        const base64Image = await convertImageToBase64(item.value);
        item.value = base64Image;
      }
    }

    // Convert array to plain object
    const simpleDataObject = {};
    for (let { key, value } of simpleDataArray) {
      simpleDataObject[key] = value;
    }

    console.log("Updated product data:", simpleDataObject);

    const response = await axios.put(`${backendUrl}/products/update`, simpleDataObject, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("authToken"),
      },
    });

    toast.success("Product updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product. Please try again.");
  }
}

