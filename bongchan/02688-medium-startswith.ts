/*
  2688 - StartsWith
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement `StartsWith<T, U>` which takes two exact string types and returns whether `T` starts with `U`

  For example

  ```typescript
  type a = StartsWith<'abc', 'ac'> // expected to be false
  type b = StartsWith<'abc', 'ab'> // expected to be true
  type c = StartsWith<'abc', 'abcd'> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/2688
*/

// 🚀 시작: 2026-06-28 15:27
// ✅ 종료: 2026-06-28 15:31
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Template Literal + infer
      - `${infer F}${U}${infer _L}` 구조로 앞에서부터 U의 매칭 여부를 판단하기 때문에 F가 ''인지 확인

        type StartsWith<T extends string, U extends string> = U extends ''
          ? true
          : T extends `${infer F}${U}${infer _L}`
            ? F extends ''
              ? true
              : false
            : false;

  😆 배움
    - 다른 풀이
      type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
        ? true
        : false;

*/

/* _____________ Your Code Here _____________ */

type StartsWith<T extends string, U extends string> = U extends ''
  ? true
  : T extends `${infer F}${U}${infer _L}`
    ? F extends ''
      ? true
      : false
    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2688/answer
  > View solutions: https://tsch.js.org/2688/solutions
  > More Challenges: https://tsch.js.org
*/
