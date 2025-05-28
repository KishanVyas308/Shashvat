import { atom } from "recoil";

// export const allReviewsAtom = atom({
//   key: "allReviewsAtom",
//   default: null,
// });

export const allCategoriesAtom = atom({
  key: "allCategoriesAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
