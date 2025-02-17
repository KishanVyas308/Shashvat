import { atom } from "recoil";

export const allReviewsAtom = atom({
  key: "allReviewsAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});