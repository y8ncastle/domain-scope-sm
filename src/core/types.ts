// subscribe 이후 상태 변화 여부를 확인할 수 있도록 타입 정의
export type Listener<T> = (nextState: T, prevState: T) => void;

// 서로 다른 두 객체가 변경되었는지 확인(리렌더링 여부 확인 목적)하는 타입 정의
export type ShallowCompare<T> = (first: T, second: T) => boolean;

// Store 코어에서 상태 관리를 위해 제공해야 하는 최소 기능 타입 정의
export type Store<T> = {
  getState: () => T;
  setState(next: T | ((prev: T) => T)): void;
  subscribe(listener: Listener<T>): () => void;
};
