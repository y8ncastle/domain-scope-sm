import { ShallowCompare, Store } from "../core/types";
import { AllowedStore, checkDomainRegistry, Domain } from "../domain";
import { createReactHook } from "./createReactHook";

/**
 * react - useDomainStore.ts
 * @description 개발자가 선언할 수 있는 useDomainStore hook을 생성한다.
 * @param domain: 도메인 이름
 * @param store: 상태 store
 * @param selector: slice 선택자 (store의 일부분을 선택하는 함수)
 * @param compare: 상태 비교 함수
 * @returns 도메인 단위의 상태 관리를 위한 hook
 */
export const useDomainStore = <D extends Domain, K extends AllowedStore<D>, T, S>(
  domain: D,
  fixKey: K,
  store: Store<T>,
  selector: (slice: T) => S,
  compare?: ShallowCompare<S>
) => {
  checkDomainRegistry(domain, fixKey); // 도메인 위반 확인

  const useStore = createReactHook(store); // createReactHook 결과 반환

  return useStore(selector, compare);
};
