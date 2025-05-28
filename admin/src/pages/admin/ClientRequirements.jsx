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
    setLoding(false);

    // Close the dialog after confirming
  };

  const cancelDelete = () => {
    dialogRef.current.close(); // Close the dialog without confirming
  };

  const sendWhatsAppMessage = (number, message) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4">
      {loding && <Loading />}
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
                  <tr
                    key={index}
                    className="border-b border-gray-200 align-top"
                  >
                    {/* No Column */}
                    <td className="py-4 px-2 border border-gray-200">
                      {index + 1}
                    </td>

                    {/* User Column */}
                    <td className="py-4 px-4 border border-gray-200">
                      <table className="text-sm">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Name:</strong>
                            </td>
                            <td className="pl-2">{requirement.name}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>E-mail:</strong>
                            </td>
                            <td className="pl-2">{requirement.email}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Contact No:</strong>
                            </td>
                            <td className="pl-2">{requirement.contactNo}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>WhatsApp No:</strong>
                            </td>
                            <td className="pl-2">{requirement.whatsAppNo}</td>
                          </tr>
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
                            <tr>
                              <td>
                                <strong>Name:</strong>
                              </td>
                              <td className="pl-2">
                                {requirement.productName}
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <strong>Link:</strong>
                              </td>
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
                    <td className="py-4 px-4 border border-gray-200 whitespace-pre-wrap">
                      {requirement.description}
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-4 border border-gray-200 space-y-2">
                      <button
                        onClick={() =>
                          sendWhatsAppMessage(
                            requirement.whatsAppNo,
                            `Hello ${
                              requirement.name
                            }, regarding your product requirement: ${
                              requirement.productName
                                ? requirement.productName
                                : ""
                            }`
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <RiWhatsappLine size={18} /> Answer
                      </button>
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
