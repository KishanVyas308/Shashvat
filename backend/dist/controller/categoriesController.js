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
exports.deleteSubCategory = exports.deleteCategory = exports.addSubCategory = exports.addCategory = exports.getCategories = void 0;
const index_1 = require("../index");
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield index_1.prisma.category.findMany();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});
exports.getCategories = getCategories;
// Add new category
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, subCategory } = req.body;
    try {
        const category = yield index_1.prisma.category.create({
            data: {
                name,
                subCategory: subCategory || [],
            },
        });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to add category" });
    }
});
exports.addCategory = addCategory;
// Add subcategory to existing category
const addSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { subCategory } = req.body; // expects a string or array of strings
    try {
        const category = yield index_1.prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        const updatedSubCategories = Array.isArray(subCategory)
            ? [...category.subCategory, ...subCategory]
            : [...category.subCategory, subCategory];
        const updatedCategory = yield index_1.prisma.category.update({
            where: { id },
            data: { subCategory: updatedSubCategories },
        });
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to add subcategory" });
    }
});
exports.addSubCategory = addSubCategory;
// Delete a category by id
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield index_1.prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        yield index_1.prisma.category.delete({ where: { id } });
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Server error during deletion" });
    }
});
exports.deleteCategory = deleteCategory;
// Delete a subcategory from a category
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // category id
    const { subCategory } = req.body; // subcategory to remove (string)
    try {
        const category = yield index_1.prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        const updatedSubCategories = category.subCategory.filter((sub) => sub !== subCategory);
        const updatedCategory = yield index_1.prisma.category.update({
            where: { id },
            data: { subCategory: updatedSubCategories },
        });
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to delete subcategory" });
    }
});
exports.deleteSubCategory = deleteSubCategory;
