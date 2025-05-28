import React, { useEffect, useRef, useState } from "react";

import {
  allRequirementRequest,
  deleteRequirementRequest,
  markAsReadAllRequest,
  sendReplayToRequest,
} from "../../backend/manageRequrimentOfUser";
import { Link } from "react-router-dom";
import { RiWhatsappLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { isNewRequrimentRequestAtom } from "../../Atoms/isNewRequrimentRequestAtom";
import { clientRequirmentsAtom } from "../../Atoms/clientRequirmentsAtom";
import Loading from "../../Componets/Loading";
import { loadingAtom } from "../../Atoms/loadingAtom";

const ClientRequirements = () => {
  const [loding, setLoding] = useRecoilState(loadingAtom);
  const [requirements, setRequirements] = useRecoilState(clientRequirmentsAtom);
  const [requestId, setRequestId] = useState(null);
  const [isNewRequrimentRequest, setIsNewRequrimentRequest] = useRecoilState(
    isNewRequrimentRequestAtom
  );

  const dialogRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setUp = async () => {
    if (requirements === null) {
      setRequirements(await allRequirementRequest());
    }
  };

  async function markread() {
    await markAsReadAllRequest();
  }

  useEffect(() => {
    setUp();
    scrollToTop();
    if (isNewRequrimentRequest === true) {
      markread();
    }
    setIsNewRequrimentRequest(false);
  }, []);

  const handleDeleteRequest = (e, id) => {
    e.preventDefault();
    setRequestId(id);
    dialogRef.current.showModal(); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    setLoding(true);
    await deleteRequirementRequest(requestId);
    setRequirements(await allRequirementRequest());
    dialogRef.current.close();
    setLoding(false)

    // Close the dialog after confirming
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // Close the dialog without confirming
  };

  return (
    <div className="p-4">
      {loding &&
        <Loading />
      }
      <h1 className="text-3xl font-bold mb-6">Client Requirements</h1>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg overflow-auto">
        {requirements && requirements.length === 0 ? (
          <div className="min-h-40 w-full flex items-center justify-center text-center">
            no requests
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2  border border-gray-200 w-2">No</th>
                <th className="py-2 px-2 md:px-4 text-left border border-gray-200">
                  User
                </th>
                <th className="py-2 px-2 md:px-10 text-left border border-gray-200">
                  Product
                </th>
                <th className="py-2 px-2 md:px-4 text-left border border-gray-200">
                  Description
                </th>
                <th className="py-2 px-2 md:px-4 text-left border border-gray-200"></th>
              </tr>
            </thead>

 <tbody>
  {requirements &&
    requirements.map((requirement, index) => (
      <tr key={index} className="border-b border-gray-200 align-top">
        {/* No Column */}
        <td className="py-4 px-2 border border-gray-200">{index + 1}</td>

        {/* User Column */}
        <td className="py-4 px-4 border border-gray-200">
          <table className="text-sm">
            <tbody>
              <tr><td><strong>Name:</strong></td><td className="pl-2">{requirement.name}</td></tr>
              <tr><td><strong>E-mail:</strong></td><td className="pl-2">{requirement.email}</td></tr>
              <tr><td><strong>Contact No:</strong></td><td className="pl-2">{requirement.contactNo}</td></tr>
              <tr><td><strong>WhatsApp No:</strong></td><td className="pl-2">{requirement.whatsappNo}</td></tr>
            </tbody>
          </table>
        </td>

        {/* Product Column */}
        <td className="py-4 px-4 border border-gray-200">
          <div className="flex gap-4 items-start">
            {requirement.productImage && (
              <img
                src={requirement.productImage}
                alt="product"
                className="w-20 h-20 object-contain border rounded"
              />
            )}
            <table className="text-sm">
              <tbody>
                <tr><td><strong>Name:</strong></td><td className="pl-2">{requirement.productName}</td></tr>
                <tr><td><strong>Category:</strong></td><td className="pl-2">{requirement.category}</td></tr>
                <tr><td><strong>Material:</strong></td><td className="pl-2">{requirement.material}</td></tr>
                <tr>
                  <td><strong>Link:</strong></td>
                  <td className="pl-2">
                    <a
                      href={`https://shashvatenterprise.com/productdetail/${requirement.productId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open Product
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>

        {/* Description Column */}
        <td className="py-4 px-4 border border-gray-200 whitespace-pre-wrap">{requirement.description}</td>

        {/* Actions Column */}
        <td className="py-4 px-4 border border-gray-200 space-y-2">
          <a
            href={`https://wa.me/${requirement.whatsappNo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.91 11.91 0 0012 0 11.9 11.9 0 00.01 11.99a11.79 11.79 0 001.63 6.02L0 24l6.19-1.61a11.9 11.9 0 0017.16-10.4 11.88 11.88 0 00-2.83-8.51zM12 22a9.9 9.9 0 01-5.15-1.45l-.37-.23-3.67.95.97-3.58-.24-.37A9.92 9.92 0 1122 12 10 10 0 0112 22zm5.28-7.38c-.29-.15-1.7-.84-1.96-.93s-.45-.15-.64.15-.74.93-.91 1.12-.34.22-.63.07a8.19 8.19 0 01-2.4-1.47 9 9 0 01-1.65-2.05c-.17-.29 0-.45.13-.6.13-.13.29-.34.44-.51a2 2 0 00.29-.49.58.58 0 00-.03-.51c-.08-.14-.64-1.55-.87-2.13s-.46-.5-.64-.51h-.55a1.07 1.07 0 00-.78.37A3.29 3.29 0 006.23 10a5.7 5.7 0 001.21 3.07A13.61 13.61 0 0014 18.3a5.65 5.65 0 003.24 1h.14a3.2 3.2 0 002.15-1.55 2.59 2.59 0 00.19-1.56c-.08-.15-.27-.22-.56-.36z" />
            </svg>
            Answer
          </a>
          <button
            onClick={(e) => handleDeleteRequest(e, requirement.id)}
            className="bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded flex items-center gap-1"
          >
            <MdDeleteOutline size={18} /> Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>


          </table>
        )}
      </div>
      <dialog ref={dialogRef} className="rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={cancelDelete}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ClientRequirements;
