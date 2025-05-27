import { Request, Response } from "express";
import { prisma } from "../index";
import { ProductInterface } from "../type";

export const addProduct = async (req: any, res: any) => {
  const {
    name,
    category,
    subCategory,
    isPopular,
    latest,
    material,
    moq,
    size,
    image,
    shape,
    color,
    pattern,
    finish,
    weight,
  }: ProductInterface = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!moq) missingFields.push("moq");
  if (!category) missingFields.push("category");
  if (!size) missingFields.push("size");
  if (!image) missingFields.push("image");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Fill all required fields!", missingFields });
  }

  try {
    const currentTime = new Date();

    // Convert boolean values to true/false
    const isPopularBool = isPopular === "true" ? true : false;
    const latestBool = latest === "true" ? true : false;

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        subCategory,
        img: image,
        isPopular: isPopularBool,
        latest: latestBool,
        material,
        moq,
        size,
        shape,
        color,
        pattern,
        finish,
        weight,
        createdAt: currentTime,
        lastUpdatedAt: currentTime,
        userId: req.user.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add product. Please try again." });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch products. Please try again." });
  }
};

export const getProductById = async (req: any, res: any) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch product by ID. Please try again." });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  const { productId }: { productId: string } = req.body;

  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete product. Please try again." });
  }
};

export const updateProduct = async (req: any, res: any) => {
  const {
    id,
    name,
    category,
    subCategory,
    image,
    isPopular,
    latest,
    material,
    moq,
    size,
    shape,
    color,
    pattern,
    finish,
    weight,
  }: ProductInterface = req.body;

  if (!image) {
    return res.status(400).json({
      message:
        "Image is uploading! Please click the button after a few seconds.",
    });
  }

  if (!name || !moq || !category || !size) {
    return res.status(400).json({ message: "Fill all required fields!" });
  }

  try {
    const currentTime = new Date();

    // Convert boolean values to true/false
    const isPopularBool = isPopular === "true" ? true : false;
    const latestBool = latest === "true" ? true : false;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        subCategory,
        img: image,
        isPopular : isPopularBool,
        latest : latestBool,
        material,
        moq,
        size,
        shape,
        color,
        pattern,
        finish,
        weight,
        lastUpdatedAt: currentTime,
      },
    });

    return res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ message: "Failed to update product. Please try again." });
  }
};
