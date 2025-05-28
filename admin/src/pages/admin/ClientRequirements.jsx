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
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2 px-2 md:px-4 border border-gray-200">
                      {requirement.product ? (
                        <div className="flex">
                          <div className="w-32 h-32 mr-3">
                            <img
                              src={requirement.product.imageUrl}
                              alt="Product"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <table className="w-full table-auto">
                              <tbody>
                                <tr>
                                  <td className="border px-2 py-1 font-semibold min-w-36">
                                    Name:
                                  </td>
                                  <td className="border px-2 py-1 min-w-72">
                                    {requirement.product.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border px-2 py-1 font-semibold min-w-36">
                                    Category:
                                  </td>
                                  <td className="border px-2 py-1 min-w-72">
                                    {requirement.product.category}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border px-2 py-1 font-semibold min-w-36">
                                    Material:
                                  </td>
                                  <td className="border px-2 py-1 min-w-72">
                                    {requirement.product.material}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border px-2 py-1 font-semibold min-w-36">
                                    Link:
                                  </td>
                                  <td className="border px-2 py-1 min-w-72 text-blue-500">
                                    <Link
                                      target="_blank"
                                      to={`https://shashvatenterprise.com/productdetail/${requirement.product.id}`}
                                    >
                                      Open Product
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500 italic">No product details</div>
                      )}
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
