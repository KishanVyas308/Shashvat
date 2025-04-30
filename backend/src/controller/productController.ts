import e, { Request, Response } from "express";
import { prisma } from "../index";
import { ProductInterface, DetailsInterface } from "../type";
import path from "path";
import fs from "fs";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - img
 *         - material
 *         - moq
 *         - size
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         img:
 *           type: string
 *           description: The image URL of the product
 *         isPopular:
 *           type: boolean
 *           description: Whether the product is popular
 *         latest:
 *           type: boolean
 *           description: Whether the product is the latest
 *         material:
 *           type: string
 *           description: The material of the product
 *         moq:
 *           type: string
 *           description: The minimum order quantity of the product
 *         size:
 *           type: string
 *           description: The size of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was created
 *         lastUpdatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Details'
 *         userId:
 *           type: string
 *           description: The ID of the user who created the product
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *       example:
 *         id: d5fE_asz
 *         name: Sample Product
 *         category: Sample Category
 *         img: http://example.com/image.jpg
 *         isPopular: true
 *         latest: true
 *         material: Sample Material
 *         moq: 100
 *         size: Medium
 *         createdAt: 2021-01-01T00:00:00.000Z
 *         lastUpdatedAt: 2021-01-01T00:00:00.000Z
 *         details: []
 *         userId: user123
 *         reviews: []
 *         requirements: []
 *     Details:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the detail
 *         color:
 *           type: string
 *           description: The color of the product
 *         finish:
 *           type: string
 *           description: The finish of the product
 *         pattern:
 *           type: string
 *           description: The pattern of the product
 *         shape:
 *           type: string
 *           description: The shape of the product
 *         weight:
 *           type: string
 *           description: The weight of the product
 *         height:
 *           type: string
 *           description: The height of the product
 *         width:
 *           type: string
 *           description: The width of the product
 *         productId:
 *           type: string
 *           description: The ID of the product
 *       example:
 *         id: detail123
 *         color: Red
 *         finish: Glossy
 *         pattern: Striped
 *         shape: Round
 *         weight: 1kg
 *         height: 10cm
 *         width: 10cm
 *         productId: product123
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         companyName:
 *           type: string
 *           description: The company name of the reviewer
 *         description:
 *           type: string
 *           description: The description of the review
 *         name:
 *           type: string
 *           description: The name of the reviewer
 *         img:
 *           type: string
 *           description: The image URL of the reviewer
 *         rating:
 *           type: integer
 *           description: The rating given by the reviewer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the review was created
 *         userId:
 *           type: string
 *           description: The ID of the user who created the review
 *         productId:
 *           type: string
 *           description: The ID of the product being reviewed
 *       example:
 *         id: review123
 *         companyName: Sample Company
 *         description: Great product!
 *         name: John Doe
 *         img: http://example.com/reviewer.jpg
 *         rating: 5
 *         createdAt: 2021-01-01T00:00:00.000Z
 *         userId: user123
 *         productId: product123
 *     Requirement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the requirement
 *         isViewed:
 *           type: boolean
 *           description: Whether the requirement has been viewed
 *         category:
 *           type: string
 *           description: The category of the requirement
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the requirement was created
 *         color:
 *           type: string
 *           description: The color of the product
 *         finish:
 *           type: string
 *           description: The finish of the product
 *         pattern:
 *           type: string
 *           description: The pattern of the product
 *         shape:
 *           type: string
 *           description: The shape of the product
 *         img:
 *           type: string
 *           description: The image URL of the product
 *         isPopular:
 *           type: boolean
 *           description: Whether the product is popular
 *         lastUpdatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the requirement was last updated
 *         latest:
 *           type: boolean
 *           description: Whether the product is the latest
 *         material:
 *           type: string
 *           description: The material of the product
 *         moq:
 *           type: string
 *           description: The minimum order quantity of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         size:
 *           type: string
 *           description: The size of the product
 *         specificDetail:
 *           type: string
 *           description: The specific detail of the requirement
 *         userId:
 *           type: string
 *           description: The ID of the user who created the requirement
 *         productId:
 *           type: string
 *           description: The ID of the product
 *       example:
 *         id: requirement123
 *         isViewed: false
 *         category: Sample Category
 *         createdAt: 2021-01-01T00:00:00.000Z
 *         color: Red
 *         finish: Glossy
 *         pattern: Striped
 *         shape: Round
 *         img: http://example.com/product.jpg
 *         isPopular: true
 *         lastUpdatedAt: 2021-01-01T00:00:00.000Z
 *         latest: true
 *         material: Sample Material
 *         moq: 100
 *         name: Sample Product
 *         size: Medium
 *         specificDetail: Specific detail
 *         userId: user123
 *         productId: product123
 */

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
export const addProduct = async (req: any, res: any) => {
  const {
    name,
    category,
    isPopular,
    latest,
    material,
    moq,
    size,
    details,
    image,
  }: ProductInterface = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!moq) missingFields.push("moq");
  if (!category) missingFields.push("category");
  if (!size) missingFields.push("size");
  if (!material) missingFields.push("material");
  if (!image) missingFields.push("image");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Fill all required fields!", missingFields });
  }

  try {
    const currentTime = new Date();

    const isPopularBool = isPopular ? true : false;
    const latestBool = latest ? true : false;
    const decodedDetail = JSON.parse(details);

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        img: image,
        isPopular: isPopularBool,
        latest: latestBool,
        material,
        moq,
        size,
        createdAt: currentTime,
        lastUpdatedAt: currentTime,
        userId: req.user.id,
        details: {
          create: decodedDetail as DetailsInterface,
        },
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

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        details: true,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch products. Please try again." });
  }
};

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: The product description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
export const getProductById = async (req: any, res: any) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        details: true,
      },
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

/**
 * @swagger
 * /products/delete:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: The product was successfully deleted
 *       500:
 *         description: Some server error
 */
export const deleteProduct = async (req: any, res: any) => {
  const { productId }: { productId: string } = req.body;

  try {
    await prisma.details.deleteMany({
      where: { productId },
    });

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

/**
 * @swagger
 * /products/update:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
export const updateProduct = async (req: any, res: any) => {
  const {
    id,
    name,
    category,
    image,
    isPopular,
    latest,
    material,
    moq,
    size,
    details,
  }: ProductInterface = req.body;

  if (!image) {
    return res
      .status(400)
      .json({
        message:
          "Image is uploading! Please click the button after a few seconds.",
      });
  }

  if (!name || !moq || !category || !size || !material) {
    return res.status(400).json({ message: "Fill all required fields!" });
  }

  let decodedDetail: DetailsInterface[];

  if (typeof details === "string") {
    try {
      const parsed = JSON.parse(details);
      if (Array.isArray(parsed)) {
        decodedDetail = parsed;
      } else {
        throw new Error("Parsed 'details' is not an array.");
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid details format." });
    }
  } else if (Array.isArray(details)) {
    decodedDetail = details;
  } else {
    return res.status(400).json({ message: "Invalid details data." });
  }

  try {
    const currentTime = new Date();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        img: image,
        isPopular,
        latest,
        material,
        moq,
        size,
        lastUpdatedAt: currentTime,
        details: {
          update: decodedDetail.map((detail) => ({
            where: { id: detail.id },
            data: detail,
          })),
        },
      },
    });

    return res
      .status(200)
      .json({
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
