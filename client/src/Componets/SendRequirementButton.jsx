import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { addProductRequirementRequest } from "../backend/manageRequrimentOfUser";

const SendRequirementButton = ({ product }) => {
  const [specificDetail, setSpecificDetail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsAppNo, setWhatsAppNo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!contactNo.trim()) {
      errors.contactNo = "Contact No. is required";
    } else if (!/^[0-9]{10}$/.test(contactNo)) {
      errors.contactNo = "Contact No. is invalid";
    }

    if (!whatsAppNo.trim()) {
      errors.whatsAppNo = "WhatsApp No. is required";
    } else if (!/^[0-9]{10}$/.test(whatsAppNo)) {
      errors.whatsAppNo = "WhatsApp No. is invalid";
    }

    if (!specificDetail.trim()) {
      errors.specificDetail = "Specific detail is required";
    }

    return errors;
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSend = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    await addProductRequirementRequest(
      { name, email, contactNo, whatsAppNo },
      product,
      specificDetail
    );

    closeModal();
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white py-2 px-3 hover:bg-blue-600 rounded-md"
        onClick={openModal}
      >
        Send Inquiry
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto flex justify-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold mb-4 text-gray-800"
                >
                  Send Inquiry
                </Dialog.Title>
                <div className="mt-2">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 ">
                          <strong>Product:</strong>
                        </td>
                        <td className="px-4 py-2">{product.name}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          <strong>Name:</strong>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                              errors.name ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your name"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.name}
                            </p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          <strong>Email:</strong>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                              errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="example@gmail.com"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          <strong>Contact No:</strong>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                              errors.contactNo ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your mobile no"
                          />
                          {errors.contactNo && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.contactNo}
                            </p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="pl-4 pr-1 py-2 ">
                          <strong >WhatsApp No:</strong>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={whatsAppNo}
                            onChange={(e) => setWhatsAppNo(e.target.value)}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                              errors.whatsAppNo ? "border-red-500" : ""
                            }`}
                            placeholder="Enter whatsapp no"
                          />
                          {errors.whatsAppNo && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.whatsAppNo}
                            </p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          <strong>Description:</strong>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={specificDetail}
                            onChange={(e) =>
                              setSpecificDetail(e.target.value)
                            }
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                              errors.specificDetail ? "border-red-500" : ""
                            }`}
                            placeholder="Enter specific description"
                          />
                          {errors.specificDetail && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.specificDetail}
                            </p>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end gap-3 mx-4">
                  <button
                    type="button"
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-700"
                    onClick={handleSend}
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SendRequirementButton;
