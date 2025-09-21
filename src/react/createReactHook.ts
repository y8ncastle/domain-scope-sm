import { useCallback, useRef, useSyncExternalStore } from "react";
import { ShallowCompare, Store } from "../core/types";

/**
 * react - createReactHook.ts
 * @description useSyncExternalStore를 기반으로 store hook을 생성하고 관리한다.
 * @param store: 상태 store (특정 store를 받아 상태 관리를 위한 hook을 생성한다.)
 * @returns 상태 관리를 위한 hook
 */
export const createReactHook = <T>(store: Store<T>) => {
  const useStore = <S>(selector: (slice: T) => S, compare: ShallowCompare<S> = Object.is): S => {
    // 현재 스냅샷에서 확인
    const getSnapshot = useCallback(() => selector(store.getState()), [selector]);

    // 외부 store 구독 및 최신 스냅샷 확인, 변경 발생시 onChange 호출
    // onChange 어댑터: Listener<T> 시그니처에 맞춰 래핑
    const subscribe = useCallback((onChange: () => void) => store.subscribe(() => onChange()), []);
    const selected = useSyncExternalStore(subscribe, getSnapshot);

    // ref를 이용해서 직전 반환 값의 참조가 바뀌지 않도록 함 (연쇄 변경 줄임)
    const ref = useRef<S>(selected);

    if (!compare(ref.current, selected)) {
      ref.current = selected;
    }

    return ref.current;
  };

  return useStore;
};
