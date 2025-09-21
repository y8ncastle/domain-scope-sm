import { create } from "zustand";

interface StoreInterface {
  currentCheckValue: string;
  setCurrentCheckValue: (value: string) => void;
}

const useZustandCheckStore = create<StoreInterface>((set) => {
  return {
    currentCheckValue: "Sooho-Check",
    setCurrentCheckValue: (value) => set({ currentCheckValue: value }),
    isCheckStatusChanged: false,
  };
});

export default useZustandCheckStore;
