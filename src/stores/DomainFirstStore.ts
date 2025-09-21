import { createStore } from "../core";
import { useDomainStore } from "../react";
import { shallowCompare } from "../utils/shallowCompare";

// Main 상태 타입
export type MainState = {
  currentMainValue: string;
  isMainStatusChanged: boolean;
  setCurrentMainValue: (value: string) => void;
  setIsMainStatusChanged: (status: boolean) => void;
};

// Main store 인스턴스
const createDomainMainStore = () => {
  const store = createStore<MainState>({
    currentMainValue: "Sooho-Main",
    isMainStatusChanged: false,
    setCurrentMainValue(status) {
      store.setState((prevState) => ({
        ...prevState,
        currentMainValue: status,
      }));
    },
    setIsMainStatusChanged(value) {
      store.setState((prevState) => ({
        ...prevState,
        isMainStatusChanged: value,
      }));
    },
  });

  return store;
};

export const domainMainStore = createDomainMainStore();

// Main store hook (Main 고정)
export const useDomainMainStore = <S>(
  selector: (state: MainState) => S,
  compare: (first: S, second: S) => boolean = shallowCompare
) => useDomainStore("Main", "main", domainMainStore, selector, compare);
