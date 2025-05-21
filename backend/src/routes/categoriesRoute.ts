import { Router } from "express"; 
import { getCategories, addCategory, addSubCategory } from "../controller/categoriesController";
import { deleteCategory, deleteSubCategory } from "../controller/categoriesController";

const router = Router();


router.get("/", getCategories);
router.post("/", addCategory);
router.post("/:id/subcategory", addSubCategory);
router.delete("/:id", deleteCategory);
router.delete("/:id/subcategory", deleteSubCategory);

export default router;