import { AllowedStore, Domain, DomainFix } from "./types";

// 런타임 바인딩 값 (타입은 DomainFix를 따르고, 값은 const로 고정)
export const FIXES: { readonly [D in Domain]: Readonly<DomainFix[D]> } = {
  Main: ["main", "check"],
  Check: ["check"],
} as const;

/**
 * domain - domainRegistry.ts
 * @description 도메인과 store fixKey 간의 관계를 런타임에서 관리한다.
 * @param domain 도메인
 * @param fixKey Store fixKey (allowedStore)
 */
// 런타임 도메인 가드
export function checkDomainRegistry<D extends Domain>(domain: D, fixKey: AllowedStore<D>): true {
  const allowed = FIXES[domain] as readonly AllowedStore<D>[];

  if (allowed.includes(fixKey)) return true;

  throw new Error(`해당 도메인은 ${String(fixKey)} store 접근 불가`);
}
