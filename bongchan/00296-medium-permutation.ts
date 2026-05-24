/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #보통 #union

  ### 질문

  주어진 유니언 타입을 순열 배열로 바꾸는 Permutation 타입을 구현하세요.


  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > GitHub에서 보기: https://tsch.js.org/296/ko
*/

// 🚀 시작: 2026-05-24 16:13
// ✅ 종료: 2026-05-24 16:43
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 유니온 타입을 어떻게 하면 튜플의 요소 형태로 변경할 수 있을까?
      - 지금은 순열까지 생각하지말고 단 하나라도 제네릭을 튜플의 요소로 변경해보자
      - type T1 = 'A' | 'B' | 'C' -> ['A', 'B', 'C']

    전혀 감이 오지 않는다...

  😆 배움
    1. 분배 조건부 타입(Distributive Conditional Types)
      - 발동 조건
        - 조건부 타입 -> T extends U ? X : Y 형태
        - extends 좌변이 naked type parameter
          - T extends U -> 발동
          - [T] extends [U] -> 발동 안 함
        - 해당 제네릭이 유니온 타입(단, never도 빈 유니온으로 취급)

      type ToArray<T> = T extends any ? T[] : never;

      type A = ToArray<string | number>;
      // 기대: (string | number)[]
      // 실제: string[] | number[]

      1) T = string | number 인 상태로 T extends any ? T[] : never 평가 시작
      2) TS가 유니언을 보고 자동 분배:
        - string extends any ? string[] : never → string[]
        - number extends any ? number[] : never → number[]
      3) 다시 합치기 → string[] | number[]

    2. never는 멤버가 0개인 유니온으로 취급
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/296/answer/ko
  > 정답 보기: https://tsch.js.org/296/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
