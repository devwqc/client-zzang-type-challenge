/*
  1097 - IsUnion
  -------
  by null (@bencor) #보통 #union

  ### 질문

  `T`를 입력으로 받고, `T`가 `Union` 유형으로 확인되는지 여부를 반환하는 `IsUnion`을 구현하세요

  예시:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > GitHub에서 보기: https://tsch.js.org/1097/ko
*/

// 🚀 시작: 2026-06-04 00:14
// ✅ 종료: 2026-06-04 00:26
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. Distributive Conditional Types
      1) 분배를 최대한 활용하기
        - 분배 시킬 제네릭 T, 그리고 역분배 시킬 제네릭 K 활용

          type IsUnion<T, K = T> = (
            T extends T ? (K extends T ? true : unknown) : never
          ) extends true
            ? false
            : true;

      2) 분배가 일어나지 않게 활용하기
        - 분배 시킬 제네릭 T, 그리고 원본을 유지 시킬 제네릭 K 활용

          type IsUnion<T, K = T> = [T] extends [never]
            ? false
            : T extends T
              ? [K] extends [T]
                ? false
                : true
              : never;

  😆 배움
    1. never는 공집합 유니온으로 취급
      - never extends never ? true : false 의 결과물은 never
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type IsUnion<T, K = T> = [T] extends [never]
  ? false
  : T extends T
    ? [K] extends [T]
      ? false
      : true
    : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/1097/answer/ko
  > 정답 보기: https://tsch.js.org/1097/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
