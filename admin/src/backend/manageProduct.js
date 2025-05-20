import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../globle";

import { convertImageToBase64, uploadImageAndGetUrl } from "./helper";

export async function addProduct(formData) {
  try {
    // Convert FormData to array of key-value objects
    const simpleDataArray = [];
    for (let [key, value] of formData.entries()) {
      simpleDataArray.push({ key, value });
    }




    // Update image field to base64 if needed
    for (let item of simpleDataArray) {
      if (item.key === "image" && (item.value instanceof File || item.value instanceof Blob)) {
        const base64Image = await convertImageToBase64(item.value);

        item.value = base64Image;
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
// console.log(products.details);
    // Convert base64 image strings to usable image URLs
    const updatedProducts = products.map((product) => {
      if (product.img && typeof product.img === "string" && product.img.startsWith("data:image")) {
        // Already a data URL (base64)
        product.imageUrl = product.img;
      } else if (product.img && typeof product.img === "string") {
        // Not a data URL: assume it's base64 and wrap it
        product.imageUrl = `data:image/png;base64,${product.img}`;
      } else {
        product.imageUrl = null; // Fallback
      }
      return product;
    });

    console.log("Fetched Products:", updatedProducts);
    return updatedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to fetch products. Please try again.");
    return null;
  }
}


export async function deleteProduct(productId) {
  try {
    await axios.delete(`${backendUrl}/products/delete`, {
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

    console.log("niwdwhdidhiwhiwdh", simpleDataArray);


    // Helper to convert File to base64
    async function convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
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

