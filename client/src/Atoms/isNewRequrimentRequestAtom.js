import { atom } from "recoil";

export const isNewRequrimentRequestAtom = atom({
  key: "isNewRequrimentRequestAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});