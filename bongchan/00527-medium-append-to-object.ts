/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #보통 #object-keys

  ### 질문

  주어진 인터페이스에 새로운 필드를 추가한 object 타입을 구현하세요. 이 타입은 세 개의 인자를 받습니다.

  예시:

  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
  ```

  > GitHub에서 보기: https://tsch.js.org/527/ko
*/

// 🚀 시작: 2026-05-26 00:12
// ✅ 종료: 2026-05-26 00:42
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. object가 들어오는 제네릭 T의 타입을 extends {}으로 좁히기
      - 제네릭 T와 새로 만들 object를 intersection 타입으로 묶을 예정

      type AppendToObject<T extends {}, U, V> = any;

    2. intersection types

      type AppendToObject<T extends {}, U extends string, V> = T & {
        [P in keyof U]: V;
      };

      - keyof U 에서 Homomorphic Mapped Types로 인해서 test1 & 'home'으로 결과가 나온다.
      - Distributive Conditional Types로 U를 유니온으로 분배

        type AppendToObject<T extends {}, U extends string, V> = U extends U
        ? {
            [P in keyof T]: T[P];
          } & {
            [P in U]: V;
          }
        : never;

        - 다음과 같은 결과가 나와서 해결되지 않음

          type T1 = {
              key: "cat";
              value: "green";
          } & {
              home: boolean;
          }

  😆 배움
    1. Intersection Types의 두 객체를 병합하는 타입 풀이
      - 내 접근에 적용 가능한 풀이
      type Compute<T> = { [K in keyof T]: T[K] }

      type AppendToObject<T, U extends string | number | symbol, V> = Compute<{
        [P in keyof T]: T[P]
      } & {
        [K in U]: V
      }>

*/

/* _____________ 여기에 코드 입력 _____________ */

type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type test1 = {
  key: 'cat';
  value: 'green';
};

type testExpect1 = {
  key: 'cat';
  value: 'green';
  home: boolean;
};

type test2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
};

type testExpect2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
  home: 1;
};

type test3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
};

type testExpect3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
  moon: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/527/answer/ko
  > 정답 보기: https://tsch.js.org/527/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
