import { auth, db, messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export async function register(user, navigator) {

  const { name, address, contactNo, whatsAppNo, email, password } = user;

  try {
    let cuser = await currentUser(email);
    if (cuser !== null) {
      alert("you already have account in SASVAT!! please login");
      navigator("/login");
      return null;
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
 
    user = userCredential.user;
    let isAdmin = false;

    // add admins
    if (email === "kishanvyas308@gmail.com") {
      isAdmin = true;
    }

    const currentTime = new Date().toString();

    await setDoc(doc(db, "Users", user.uid), {
      id: user.uid,
      name,
      address,
      contactNo,
      whatsAppNo,
      email: email,
      password: password,
      isAdmin: isAdmin,
      createdAt: currentTime,
    });
 
    alert("New user created");
    cuser = await currentUser(email);
    navigator("/");
    return cuser;
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Somthing went wrong, plaease refresh !!");
    return null;
  }
}

export async function login(email, password, navigator) {
  try {
    let user = await currentUser(email);
    if (user === null) {
      navigator("/signup");
      alert("Firest register!!");
      return null;
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    navigator("/");
    return user;
  } catch (error) {
    const errorCode = error.code || 500;
    const errorMessage = error.message || "Internal Server Error";
    alert("invalid password!!");
    return null;
  }
}

export async function currentUser(email) {
  try {
    const q = query(collection(db, "Users"), where("email", "==", email));
    
    const querySnapshot = await getDocs(q);
  

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}




