"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProductById = exports.getAllProducts = exports.addProduct = void 0;
const index_1 = require("../index");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, subCategory, isPopular, latest, material, moq, size, image, shape, color, pattern, finish, weight, } = req.body;
    const missingFields = [];
    if (!name)
        missingFields.push("name");
    if (!moq)
        missingFields.push("moq");
    if (!category)
        missingFields.push("category");
    if (!size)
        missingFields.push("size");
    if (!image)
        missingFields.push("image");
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
        const newProduct = yield index_1.prisma.product.create({
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
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Failed to add product. Please try again." });
    }
});
exports.addProduct = addProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield index_1.prisma.product.findMany();
        return res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return res
            .status(500)
            .json({ message: "Failed to fetch products. Please try again." });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield index_1.prisma.product.findUnique({
            where: { id: req.params.id },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        console.log("Error fetching product by ID:", error);
        return res
            .status(500)
            .json({ message: "Failed to fetch product by ID. Please try again." });
    }
});
exports.getProductById = getProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    try {
        yield index_1.prisma.product.delete({
            where: { id: productId },
        });
        return res.status(200).json({ message: "Product deleted successfully!" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return res
            .status(500)
            .json({ message: "Failed to delete product. Please try again." });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, category, subCategory, image, isPopular, latest, material, moq, size, shape, color, pattern, finish, weight, } = req.body;
    if (!image) {
        return res.status(400).json({
            message: "Image is uploading! Please click the button after a few seconds.",
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
        const updatedProduct = yield index_1.prisma.product.update({
            where: { id },
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
                lastUpdatedAt: currentTime,
            },
        });
        return res.status(200).json({
            message: "Product updated successfully!",
            product: updatedProduct,
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        return res
            .status(500)
            .json({ message: "Failed to update product. Please try again." });
    }
});
exports.updateProduct = updateProduct;
