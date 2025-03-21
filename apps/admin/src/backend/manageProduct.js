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
import { toast } from "react-toastify";

export async function addProduct(product, imageUrl) {
  const {
    name,
    moq,
    category,
    size,
    material,
    isPopular,
    latest,
    details: { shape, color, pattern, finish },
  } = product;

  if (!imageUrl) {
   toast.error("image is uploading! click button after few seconds.");
    return;
  }

  if (!name || !moq || !category || !size || !material) {
    alert("fill all required field!!");
    return;
  }

  try {
    const currentTime = new Date().toString();
    const id = currentTime.replace(/\s+/g, "");


    await setDoc(doc(db, "Products",  id), {
      id,
      name,
      imageUrl,
      moq,
      category,
      size,
      material,
      isPopular,
      latest,
      details: { shape, color, pattern, finish },
      createdAt: currentTime,
      lastUpdatedAt: currentTime,
    });
  } catch (error) {
    console.log(error);
    
    return;
  }
}

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

export async function deleteProduct(productId, imageUrl) {
  try {
    const docRef = doc(db, "Products", productId);
  

    try {
      
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
     
        await deleteObject(imageRef);
    
      }
    } catch (error) {
      
    }
    await deleteDoc(docRef);

    toast.success("Product deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete product. Please try again.");
  }
}

export async function updateProduct(product) {
  const {
    id,
    name,
    imageUrl,
    moq,
    category,
    size,
    material,
    isPopular,
    latest,
    details: { shape, color, pattern, finish },
  } = product;

  if (!imageUrl) {
    alert("Image is uploading! Please click the button after a few seconds.");
    return;
  }

  if (!name || !moq || !category || !size || !material) {
   toast.error("Fill all required fields!!");
    return;
  }

  try {
    const currentTime = new Date().toString();

    await setDoc(
      doc(db, "Products", id),
      {
        id,
        name,
        imageUrl,
        moq,
        category,
        size,
        material,
        isPopular,
        latest,
        details: { shape, color, pattern, finish },
        lastUpdatedAt: currentTime,
      },
      { merge: true }
    ); // Use merge to update existing fields

  } catch (error) {
   toast.error("Failed to update product. Please try again.");
    return;
  }

  toast.success("Product updated successfully!")
}
