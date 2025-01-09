export const sendWhatsAppMessage = (product) => {
  const number = "9099757588"; // recipient number in international format
  const message = `Hello, I want to know more about *${product.name}* : \n\nhttps://shashvatenterprise.com/productdetail/${product.id}`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
