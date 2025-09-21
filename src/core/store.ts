import { Listener, Store } from "./types";

/**
 * core - store.ts
 * @description 상태 관리를 위한 최소한의 기능을 포함한다.
 * @param initialState: 초기 상태값 (어떠한 형태의 상태도 받을 수 있도록 일반화)
 */
export const createStore = <T>(initialState: T): Store<T> => {
  let state = initialState; // 실제 상태 저장
  const listeners = new Set<Listener<T>>(); // 변경 사항을 전달받을 집합

  // 현재 상태를 그대로 반환
  const getState = (): T => {
    return state;
  };

  // 새로운 상태로 데이터를 변경하는 함수
  const setState = (next: T | ((prev: T) => T)): void => {
    const prevState = state; // 상태 변경 전 스냅샷
    const nextState =
      typeof next === "function" ? (next as (prev: T) => T)(prevState) : next;
    // next가 함수인 경우에는 setter로 간주하고, 변경 전 스냅샷을 넣어 다음 상태를 계산

    // 기존과 동일한 참조를 가진다면 리렌더링 하지 않음
    if (Object.is(prevState, nextState)) return;

    state = nextState; // 새로운 스냅샷으로 교체
    listeners.forEach((ls) => ls(state, prevState)); // 모든 listener에 상태 변경 알림
  };

  // subscribe로 등록하고, 완료 후 listener를 제거함
  const subscribe = (listener: Listener<T>): (() => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
};
