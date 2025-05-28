import axios from "axios";

export const fetchCategories = async (setCategories, API_BASE) => {
  try {
    const res = await axios.get(API_BASE);
    // Transform backend structure to frontend structure if needed
    setCategories(
      res.data.map((cat) => ({
        id: cat.id,
        name: cat.name,
        subcategories: (cat.subCategory || []).map((sub, idx) => ({
          id: `${cat.id}-sub-${idx}`,
          name: sub,
        })),
      }))
    );
  } catch (error) {
    showAlert("error", "Failed to fetch categories");
  }
};


