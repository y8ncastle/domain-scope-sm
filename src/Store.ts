import { create } from "zustand";

interface StoreInterface {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const useGlobalStore = create<StoreInterface>((set) => {
  return {
    isLogin: false,
    setIsLogin: (login) => set({ isLogin: login }),
  };
});

export default useGlobalStore;
