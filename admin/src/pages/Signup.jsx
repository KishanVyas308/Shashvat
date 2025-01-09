// src/Signup.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../backend/auth";
import { useRecoilState } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { loadingAtom } from "../Atoms/loadingAtom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsAppNo, setWhatsAppNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!address) newErrors.address = "Address is required";
    if (!contactNo) newErrors.contactNo = "Contact number is required";
    else if (contactNo.length !== 10) newErrors.contactNo = "Enter valid number";
    if (!whatsAppNo) newErrors.whatsAppNo = "WhatsApp number is required";
    else if (whatsAppNo.length !== 10) newErrors.whatsAppNo = "Enter valid number";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (validate()) {
      try {
        const username = firstName + " " + lastName;
        const user = { name: username, address, contactNo, whatsAppNo, email, password };
        const registeredUser = await register(user, navigate);
        setUser(registeredUser);
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Something went wrong, please refresh!");
      }
    }
    setIsLoading(false);
  };

  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        alert("You are logged in for 30 min, please re-login");
        setUser(null);
      }, 30 * 60 * 1000);
    }

    scrollToTop()
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" style={{width:'100%'}}>
        <h2 className="text-2xl font-bold mb-8 text-center text-indigo-600">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-semibold">First Name</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-semibold">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Jamnagar, Gujarat, India"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="contactNo" className="block text-sm font-semibold">Contact No</label>
            <input
              type="text"
              id="contactNo"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter your contact number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
            {errors.contactNo && <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="whatsAppNo" className="block text-sm font-semibold">WhatsApp No</label>
            <input
              type="text"
              id="whatsAppNo"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter your WhatsApp number"
              value={whatsAppNo}
              onChange={(e) => setWhatsAppNo(e.target.value)}
            />
            {errors.whatsAppNo && <p className="text-red-500 text-xs mt-1">{errors.whatsAppNo}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="johnsmith@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className={`block w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:bg-indigo-700 transition duration-200 ${isLoading && "opacity-50 cursor-not-allowed"}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
