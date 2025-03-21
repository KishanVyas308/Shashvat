import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function addProductRequirementRequest(
  user,
  product,
  specificDetail
) {
  const currentTime = new Date().toString();
  const id = currentTime.replace(/\s+/g, "");
  try {
    await setDoc(doc(db, "Requirements", id), {
      id,
      user,
      product,
      specificDetail,
      isViewd: false,
    });

    alert("Requirement request sended!!");
  } catch (error) {
    alert("Something gose wrong!!");
  }
}

export async function allRequirementRequest() {
  try {
    const Requirements = await getDocs(collection(db, "Requirements"));
   
    const RequirementsData = []; // Array to store the product data
    Requirements.forEach(async (doc) => {
      // Access the document data
      const data = doc.data();
      RequirementsData.push(data);
    });

    return RequirementsData;
  } catch (error) {
    console.error("Error geting all Request:", error); // Log specific error for debugging
    return null; // Generic error message for user
  }
}

export async function markAsReadAllRequest() {
  try {
    const q = query(
      collection(db, "Requirements"),
      where("isViewd", "==", false)
    );
    const querySnapshot = await getDocs(q);
   
    for (const document of querySnapshot.docs) {
      // Access the document data
      const data = document.data();

      // Create a reference to the document
      const docRef = doc(db, "Requirements", document.id);

      // Update the document
      await updateDoc(docRef, {
        isViewd: true,
      });
    
    }
  } catch (error) {
    console.error("Error:", error); // Log specific error for debugging
    // Generic error message for user
  }
}

export async function sendReplayToRequest(product, user, specificDetail) {
  const number = user.whatsAppNo; // recipient number in international format
  const message = `Dear *${user.name}* \n\nWe(Sasvat) recived your request on *${product.name}* \nhttp://shashvatenterprise/productdetail/${product.id}  \n\nWhere your reques is \n_${specificDetail}_ \n\n `;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export async function deleteRequirementRequest(id) {
  try {
    console.log(id);
    await deleteDoc(doc(db, "Requirements", id));

    alert("Request deleted..");
  } catch (error) {
    alert("Something went wrong");
  }
}
