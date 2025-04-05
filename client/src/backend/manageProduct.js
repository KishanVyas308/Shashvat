import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { deleteObject, ref } from "firebase/storage";


export async function allProduct() {
  try {
    const products = await getDocs(collection(db, "Products"));


    const productData = []; // Array to store the product data
    products.forEach(async (doc) => {
      // Access the document data
      const data = doc.data();
      productData.push(data);
    });

    return productData;
  } catch (error) {
    console.error("Error updating product:", error); // Log specific error for debugging
    return null; // Generic error message for user
  }
}

