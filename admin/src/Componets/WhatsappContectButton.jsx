import React from "react";
import { RiWhatsappLine } from "react-icons/ri";
import { sendWhatsAppMessage } from "../backend/manageUser";
const WhatsappContectButton = ({product}) => {
  return (
    <button
      className="bg-green-500 gap-1 flex items-center text-white py-2 px-4 rounded mr-2 transition duration-300 hover:bg-green-600"
      onClick={(e) => {
        e.preventDefault();
        sendWhatsAppMessage(product)
      }}
    >
        <RiWhatsappLine className="text-white text-[18px]" />
      Contact Us
    </button>
  );
};

export default WhatsappContectButton;
