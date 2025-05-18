import axios from "axios";
import { backendUrl } from "../globle";
import { authAtom } from "../Atoms/authAtom";
import { useSetRecoilState } from "recoil";

export async function register(user, navigator) {
  const { name, address, contactNo, whatsAppNo, email, password } = user;

  try {
    const response = await axios.post(`${backendUrl}/auth/register`, {
      name,
      address,
      contactNo,
      whatsAppNo,
      email,
      password,
    });

    if (response.status === 201) {
      alert("New user created");
      navigator("/");
      return response.data.user;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert(error.response?.data?.message || "Something went wrong, please refresh!");
    return null;
  }
}

export async function login(email, password, navigator) {
 

  try {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem("authToken", token);
    
      alert("Login successful");
      navigator("/");
      return {user: response.data.user, token};
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert(error.response?.data?.message || "Invalid credentials!");
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




