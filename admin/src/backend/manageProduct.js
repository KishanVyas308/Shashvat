import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../globle";

export async function addProduct(formData) {
  try {

    const response = await axios.post(`${backendUrl}/products/add`, formData, {
      headers: { 
      "Content-Type": "multipart/form-data",
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
    console.log( "hyyyyyyyyyyyyyy ",response.data);
    
    return response.data;

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
    const response = await axios.put(`${backendUrl}/products/update`, formData, {
      headers: { 
      "Content-Type": "multipart/form-data",
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
