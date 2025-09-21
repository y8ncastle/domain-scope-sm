export const shallowCompare = <T>(first: T, second: T): boolean => {
  // 1) 동일 참조 / NaN / +0/-0까지 안전하게
  if (Object.is(first, second)) return true;

  // 2) 둘 중 하나라도 객체가 아니면 → 값 비교(Object.is)만 의미 있음 → 이미 위에서 false 처리됨
  if (
    typeof first !== "object" ||
    first === null ||
    typeof second !== "object" ||
    second === null
  ) {
    return false;
  }

  // 3) 얕은 비교 (1 depth)
  const aKeys = Object.keys(first as Record<string, unknown>);
  const bKeys = Object.keys(second as Record<string, unknown>);

  if (aKeys.length !== bKeys.length) return false;

  for (let i = 0; i < aKeys.length; i++) {
    const k = aKeys[i]!;

    if (!Object.prototype.hasOwnProperty.call(second, k)) return false;

    // @ts-expect-error: 구체적으로 어떤 타입이 나올지 몰라 생기는 제약을 무시
    if (!Object.is(a[k], b[k])) return false;
  }

  return true;
};
