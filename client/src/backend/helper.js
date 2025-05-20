import axios from "axios";
import { backendUrl } from "../globle";

export async function convertImageToBase64(file, maxWidth = 600, quality = 0.5) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement("canvas");

                // Resize with aspect ratio
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // More aggressive compression
                const base64String = canvas.toDataURL("image/jpeg", quality); // quality: 0.5 or lower
                console.log((base64String.length * 0.75 / 1024).toFixed(2) + " KB");
                resolve(base64String);
            };

            img.onerror = reject;
            img.src = event.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });


}

export async function UploadImage(params) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}


export async function uploadImageAndGetUrl(imageFile) {
  try {
    if (!imageFile) throw new Error("No image file provided");

    const formData = new FormData();
    formData.append("file", imageFile); // 'file' must match backend field name

    const response = await axios.post(`${backendUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 && response.data.url) {
      console.log("Uploaded Image URL:", response.data.url);
      return response.data.url;
    } else {
      throw new Error("Failed to retrieve image URL");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
}
