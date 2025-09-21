import { createStore } from "../core";
import { useDomainStore } from "../react";
import { shallowCompare } from "../utils/shallowCompare";

// Check 상태 타입
export type CheckState = {
  currentCheckValue: string;
  isCheckStatusChanged: boolean;
  setCurrentCheckValue: (value: string) => void;
  setIsCheckStatusChanged: (status: boolean) => void;
};

// Check store 인스턴스
const createDomainCheckStore = () => {
  const store = createStore<CheckState>({
    currentCheckValue: "Sooho-Check",
    isCheckStatusChanged: false,
    setCurrentCheckValue(status) {
      store.setState((prevState) => ({
        ...prevState,
        currentCheckValue: status,
      }));
    },
    setIsCheckStatusChanged(value) {
      store.setState((prevState) => ({
        ...prevState,
        isCheckStatusChanged: value,
      }));
    },
  });

  return store;
};

export const domainCheckStore = createDomainCheckStore();

// Check store hook (Check 고정)
export const useDomainCheckStore = <S>(
  selector: (state: CheckState) => S,
  compare: (first: S, second: S) => boolean = shallowCompare
) => useDomainStore("Check", "check", domainCheckStore, selector, compare);
