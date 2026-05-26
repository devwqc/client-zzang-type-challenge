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

// 🚀 시작: 2026-05-26 21:45
// ✅ 종료: 2026-05-26 21:47
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Mapped Types
      - 제네릭 T의 keyof와 U를 유니온으로 프로퍼티 P를 갖는 Mapped Types 생성
      - 프로퍼티 P를 extends keyof T로 타입을 좁혀서 조건부 처리

      type AppendToObject<T, U extends string, V> = {
        [P in keyof T | U]: P extends keyof T ? T[P] : V;
      };

    2. Intersection Types로 두 객체를 합하여 합치기
      
      type Compute<T extends {}> = {
        [P in keyof T]: T[P];
      };

      type AppendToObject<T, U extends keyof any, V> = Compute<
        T & {
          [P in U]: V;
        }
      >;

  😆 배움
    -

*/

/* _____________ 여기에 코드 입력 _____________ */

// 접근 1
// type AppendToObject<T, U extends string, V> = {
//   [P in keyof T | U]: P extends keyof T ? T[P] : V;
// };

// 접근 2
type Compute<T extends {}> = {
  [P in keyof T]: T[P];
};

type AppendToObject<T, U extends keyof any, V> = Compute<
  T & {
    [P in U]: V;
  }
>;

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
