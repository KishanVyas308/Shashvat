import { atom } from "recoil";

export const productAtom = atom({
  key: "productAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});


