import { Request, Response } from "express";

import { prisma } from "../index";

// Get all categories
export const getCategories = async (req: any, res: any) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Add new category
export const addCategory = async (req: any, res: any) => {
  const { name, subCategory } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
        subCategory: subCategory || [],
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to add category" });
  }
};

// Add subcategory to existing category
export const addSubCategory = async (req: any, res: any) => {
  const { id } = req.params;
  const { subCategory } = req.body; // expects a string or array of strings

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedSubCategories = Array.isArray(subCategory)
      ? [...category.subCategory, ...subCategory]
      : [...category.subCategory, subCategory];

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { subCategory: updatedSubCategories },
    });

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: "Failed to add subcategory" });
  }
};


// Delete a category by id
export const deleteCategory = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await prisma.category.delete({ where: { id } });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error during deletion" });
  }
};

// Delete a subcategory from a category
export const deleteSubCategory = async (req: any, res: any) => {
    const { id } = req.params; // category id
    const { subCategory } = req.body; // subcategory to remove (string)

    try {
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        const updatedSubCategories = category.subCategory.filter(
            (sub: string) => sub !== subCategory
        );

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { subCategory: updatedSubCategories },
        });

        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: "Failed to delete subcategory" });
    }
};


