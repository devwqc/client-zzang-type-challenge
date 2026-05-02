/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #쉬움 #array

  ### 질문

  `Array.push`의 제네릭 버전을 구현하세요.

  예시:

  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```

  > GitHub에서 보기: https://tsch.js.org/3057/ko
*/

// 🚀 시작: 2026-05-02 16:38
// ✅ 종료: 2026-05-02 16:49
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    - 인스턴스 배열에 스프레드 연산자로 T 배열을 풀어주고 뒤에 U를 넣어주면 되겠다고 생각

  😆 배움
    - 정답을 보니까 type Push<T extends unknown[], U> = [...T, U]; 이렇게 단순하게 접근해도 됐다.
    
    1. 가변 튜플
      - 2번 에러 케이스 Expect<Equal<Push<string[], number>, [string, number]>> 에서 [string, number]는 두 원소짜리 고정 튜플을 의미한다.
      - string[]는 string의 수가 0개, 1개, 2개, ... n개 가변적이기 때문에 고정 튜플과 Equal 비교를 하면 에러 발생
      - 배열
        - T[]: 모든 인덱스가 같은 타입, 길이 무한
      - 튜플
        - [T, U]: 인덱스별로 타입이 정해짐, 길이 고정
      - 가변 튜플
        - [...T[], U]: 일부는 고정, 일부는 가변
*/

/* _____________ 여기에 코드 입력 _____________ */

type Push<T extends unknown[], U> = T extends [...infer Rest]
  ? Rest extends never
    ? [U]
    : [...Rest, U]
  : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
];

type errors = [
  // @ts-expect-error
  Expect<Equal<Push<number[], string>, string[]>>,
  // @ts-expect-error
  Expect<Equal<Push<string[], number>, [string, number]>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/3057/answer/ko
  > 정답 보기: https://tsch.js.org/3057/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
