import { atom } from "recoil";

export const loadingAtom = atom({
  key: "loadingAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});