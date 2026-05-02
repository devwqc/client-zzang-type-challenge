/*
  3060 - Unshift
  -------
  by jiangshan (@jiangshanmeta) #쉬움 #array

  ### 질문

  `Array.unshift`의 타입 버전을 구현하세요.

  예시:

  ```typescript
  type Result = Unshift<[1, 2], 0> // [0, 1, 2]
  ```

  > GitHub에서 보기: https://tsch.js.org/3060/ko
*/

// 🚀 시작: 2026-05-02 21:40
// ✅ 종료: 2026-05-02 21:40
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    - T를 unknown[]로 타입 제한하고 배열 리터럴을 활용해서 U를 앞에 두고 스프레드 연산자를 활용해서 T를 뒤에 풀어주기

  😆 배움
    - 튜플 리터럴과 가변 튜플 타입(Variadic Tuple Types)
      - 튜플 리터럴: []
      - 가변 튜플 타입: [...T]
*/

/* _____________ 여기에 코드 입력 _____________ */

type Unshift<T extends unknown[], U> = [U, ...T];

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/3060/answer/ko
  > 정답 보기: https://tsch.js.org/3060/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
