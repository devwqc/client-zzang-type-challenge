/*
  949 - AnyOf
  -------
  by null (@kynefuk) #보통 #array

  ### 질문

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  Python의 `any` function을 타입 시스템으로 구현하세요

  배열을 사용하고 배열의 요소가 참이면 `true`를 반환합니다. 배열이 비어 있으면 `false`를 반환합니다

  예시:

  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]> // expected to be false.
  ```

  > GitHub에서 보기: https://tsch.js.org/949/ko
*/

// 🚀 시작: 2026-05-31 20:37
// ✅ 종료: 2026-05-31 21:02
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. type 레벨에서 truthy, falsy 판별 가능한가?
      - Falsy 값을 유니온으로 선언, 객체는 keyof를 사용하고 Falsy 체크

      type Falsy = 0 | undefined | null | false | [] | '';
      type isObject<T> = T extends {}
        ? T extends Array<unknown> | Function
          ? false
          : true
        : false;

      type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
        ? F extends Falsy
          ? AnyOf<R>
          : isObject<F> extends true
            ? keyof F extends Falsy
              ? AnyOf<R>
              : true
            : true
        : false;

  😆 배움
    1. 배열/튜플의 number 프로퍼티, Record<PropertyKey, never> 사용

      type AnyOf<T extends readonly any[]> = T[number] extends
        | 0
        | ''
        | false
        | []
        | Record<PropertyKey, never>
        | undefined
        | null
        ? false
        : true;

*/

/* _____________ 여기에 코드 입력 _____________ */

type Falsy = 0 | undefined | null | false | [] | '';
type isObject<T> = T extends {}
  ? T extends Array<unknown> | Function
    ? false
    : true
  : false;

type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? F extends Falsy
    ? AnyOf<R>
    : isObject<F> extends true
      ? keyof F extends Falsy
        ? AnyOf<R>
        : true
      : true
  : false;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/949/answer/ko
  > 정답 보기: https://tsch.js.org/949/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
