import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";


export async function storeReview(review, imageFile) {
  try {
    let imageUrl = "";
    
    if (imageFile) {
      const storageRef = ref(storage, `reviews/${imageFile.name}`);
      
      await uploadBytes(storageRef, imageFile);

      imageUrl = await getDownloadURL(storageRef);
   
    }
    const currentTime = new Date().toString();
    const id = currentTime.replace(/\s+/g, "");

    await setDoc(doc(db, "Reviews", id), {
      id: id,
      name: review.name,
      companyName: review.companyName,
      description: review.description,
     
      photoUrl: imageUrl,
    });


    toast.success("Review added successfully!")
  } catch (error) {
   toast.error("Something went wrong, Please refresh!!")
   
  }
}

export async function getAllReviews() {
  try {
    const querySnapshot = await getDocs(collection(db, "Reviews"));
  

    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    
    return reviews;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
}


export async function deleteReview(reviewId, photoUrl) {
  try {
    // Get the document reference
    const docRef = doc(db, "Reviews", reviewId);



    // Delete the image from storage if it exists
    try {
      
      if (photoUrl) {
        const imageRef = ref(storage, photoUrl);
       
        await deleteObject(imageRef);
  
      }
    } catch (error) {
      
    }

    // Delete the review document
    await deleteDoc(docRef);

  toast.success("review Delete sucessful")
  } catch (error) {
    console.log(error)
    toast.error("error in deleting review");
  }
}