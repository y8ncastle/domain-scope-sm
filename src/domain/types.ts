/**
 * domain - types.ts
 * @description 도메인 단위의 접근 제어를 포함한 상태 관리를 위한 타입을 정의한다.
 */

// 도메인(페이지) 집합 타입
export type Domain = "Main" | "Check";

// Store fixKey 집합 타입
export type FixKey = "main" | "check";

// 도메인 -> 허용 가능한 store에 대한 타입 정의
export type DomainFix = {
  Main: ["main", "check"];
  Check: ["check"];
};

// 특정 도메인에서 허용되는 store fixKey 타입 정의
export type AllowedStore<D extends Domain> = DomainFix[D][number];
