import React, { useState, useEffect } from "react";
// import { auth, db } from "../backend/firebase"; // Import your Firebase configuration
// import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { currentUser } from "../backend/auth";

const UserProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    contactNo: "",
    whatsAppNo: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const validateName = (name) => {
    return name.trim() !== "";
  };

  const validateAddress = (address) => {
    return address.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let validationErrors = {};

    if (!validateName(userData.name)) {
      validationErrors.name = "Name is required";
      valid = false;
    }

    if (!validateAddress(userData.address)) {
      validationErrors.address = "Address is required";
      valid = false;
    }

    if (!validateEmail(userData.email)) {
      validationErrors.email = "Invalid email format";
      valid = false;
    }

    if (userData.email !== user.email) {
      if ((await currentUser(userData.email)) !== null) {
        validationErrors.email = "This email alerdy exeist";
        valid = false;
      }
    }

    if (!validatePhoneNumber(userData.contactNo)) {
      validationErrors.contactNo = "Contact number must be 10 digits";
      valid = false;
    }

    if (!validatePhoneNumber(userData.whatsAppNo)) {
      validationErrors.whatsAppNo = "WhatsApp number must be 10 digits";
      valid = false;
    }

    setErrors(validationErrors);

    if (!valid) {
      return;
    }

    if (user) {
      try {
        await updateDoc(doc(db, "Users", user.id), userData);
        console.log("firebase used")
        const updatedUserDoc = await getDoc(doc(db, "Users", user.id));
        console.log("firebase used")
        setUser(updatedUserDoc.data());
        alert("User data updated successfully!");
      } catch (error) {
        console.error("Error updating user data:", error);
        alert("Error updating user data. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
     /**
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact No
          </label>
          <input
            type="text"
            name="contactNo"
            value={userData.contactNo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.contactNo && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            WhatsApp No
          </label>
          <input
            type="text"
            name="whatsAppNo"
            value={userData.whatsAppNo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.whatsAppNo && (
            <p className="text-red-500 text-xs mt-1">{errors.whatsAppNo}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Update
        </button>
      </form>
      */
    </div>
  );
};

export default UserProfile;
