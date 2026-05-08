/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #보통 #infer #tuple #union

  ### 질문

  튜플 값으로 유니온 타입을 생성하는 제네릭 `TupleToUnion<T>`를 구현하세요.

  예시:

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > GitHub에서 보기: https://tsch.js.org/10/ko
*/

// 🚀 시작: 2026-05-08 12:33
// ✅ 종료: 2026-05-08 12:33
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 튜플/배열 타입에 number 로 접근해서 유니온으로 합치기

  😆 배움

*/

/* _____________ 여기에 코드 입력 _____________ */

type TupleToUnion<T extends any[]> = T[number];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/10/answer/ko
  > 정답 보기: https://tsch.js.org/10/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
