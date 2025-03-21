import { atom } from "recoil";

export const isUserIsInTimeOfLoginAtom = atom({
  key: "isUserIsInTimeOfLoginAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});