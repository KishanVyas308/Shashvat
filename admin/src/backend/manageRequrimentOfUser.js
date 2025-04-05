import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../globle";

export async function addProductRequirementRequest(user, product, specificDetail) {
  try {
    const response = await axios.post(`${backendUrl}/requirements/add`, {
      name: user.name,
      email: user.email,
      contactNo: user.contactNo,
      whatsAppNo: user.whatsAppNo,
      companyName: user.companyName,
      description: specificDetail,
      isNewProductRequest: true,
      productId: product.id,
      productName: product.name,
    });

    if (response.status === 201) {
      toast.success("Requirement request sent!");
    }
  } catch (error) {
    console.error("Error adding requirement request:", error);
    toast.error("Something went wrong!");
  }
}

export async function allRequirementRequest() {
  try {
    const response = await axios.get(`${backendUrl}/requirements/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all requests:", error);
    return null;
  }
}

export async function markAsReadAllRequest() {
  try {
    const response = await axios.put(`${backendUrl}/requirements/mark-as-read`);
    if (response.status === 200) {
      toast.success("All requests marked as read.");
    }
  } catch (error) {
    console.error("Error marking requests as read:", error);
    toast.error("Something went wrong!");
  }
}

export async function sendReplayToRequest(product, user, specificDetail) {
  const number = user.whatsAppNo;
  const message = `Dear *${user.name}* \n\nWe (Shasvat) received your request on *${product.name}* \nhttp://shashvatenterprise/productdetail/${product.id}  \n\nWhere your request is \n_${specificDetail}_ \n\n `;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export async function deleteRequirementRequest(id) {
  try {
    const response = await axios.delete(`${backendUrl}/requirements/delete`, {
      data: { id },
    });

    if (response.status === 200) {
      toast.success("Request deleted.");
    }
  } catch (error) {
    console.error("Error deleting requirement request:", error);
    toast.error("Something went wrong!");
  }
}
