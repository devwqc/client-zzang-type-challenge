/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #math #template-literal

  ### 질문

  number, string, 혹은 bigint을 받는 `Absolute` 타입을 만드세요.
  출력은 양수 문자열이어야 합니다.

  예시:

  ```ts
  type Test = -100
  type Result = Absolute<Test> // expected to be "100"
  ```

  > GitHub에서 보기: https://tsch.js.org/529/ko
*/

// 🚀 시작: 2026-05-26 21:54
// ✅ 종료: 2026-05-26 22:09
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 재귀 + Template Literal
      - 0~9까지 숫자 유니온을 받는 type을 만들고 Template Literal로 숫자가 아닌 값 제거

      type Numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

      type Absolute<
        T extends number | string | bigint,
        R extends string = '',
      > = `${T}` extends `${infer F}${infer L}`
        ? F extends Numbers
          ? Absolute<L, `${R}${F}`>
          : Absolute<L, R>
        : R;

  😆 배움
    1. 다른 풀이
      type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`

*/

/* _____________ 여기에 코드 입력 _____________ */

type Numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type Absolute<
  T extends number | string | bigint,
  R extends string = '',
> = `${T}` extends `${infer F}${infer L}`
  ? F extends Numbers
    ? Absolute<L, `${R}${F}`>
    : Absolute<L, R>
  : R;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/529/answer/ko
  > 정답 보기: https://tsch.js.org/529/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
