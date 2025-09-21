import { create } from "zustand";

// Main 상태 타입
interface StoreInterface {
  currentMainValue: string;
  setCurrentMainValue: (value: string) => void;
}

// Main store 인스턴스
const useZustandMainStore = create<StoreInterface>((set) => {
  return {
    currentMainValue: "Sooho-Main",
    setCurrentMainValue: (value) => set({ currentMainValue: value }),
    isMainStatusChanged: false,
  };
});

export default useZustandMainStore;
