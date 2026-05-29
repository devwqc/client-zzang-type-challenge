/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #보통 #object

  ### 질문

  두개의 타입을 새로운 타입으로 병합하세요.
  두번째 타입의 Key가 첫번째 타입을 덮어씁니다(재정의합니다)

  예시:

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > GitHub에서 보기: https://tsch.js.org/599/ko
*/

// 🚀 시작: 2026-05-29 22:01
// ✅ 종료: 2026-05-29 22:07
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. intersection types

      1-1) intersection types를 하나의 객체 타입으로 만드는 Compute 타입

        type Compute<T> = {
          [P in keyof T]: T[P];
        };

        type Merge<F, S> = Compute<
          {
            [P in keyof F]: F[P];
          } & {
            [P in keyof S]: S[P];
          }
        >;

      1-2) 제네릭 S의 key로 제네릭 F의 key를 덮어쓰기
        - 정확히는 덮어쓰는 것이 아니라 제네릭 F로 Mapped Types를 만들 때 S의 key에 포함되면 never로 프로퍼티 삭제

        type Merge<F, S> = Compute<
          {
            [P in keyof F as P extends keyof S ? never : P]: F[P];
          } & {
            [P in keyof S]: S[P];
          }
        >;

  😆 배움
    1. 다른 풀이들
      
      type Merge<F, S> = {
        [K in keyof F | keyof S]: K extends keyof S
          ? S[K]
          : K extends keyof F
            ? F[K]
            : never;
      };

*/

/* _____________ 여기에 코드 입력 _____________ */

type Compute<T> = {
  [P in keyof T]: T[P];
};

type Merge<F, S> = Compute<
  {
    [P in keyof F as P extends keyof S ? never : P]: F[P];
  } & {
    [P in keyof S]: S[P];
  }
>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/599/answer/ko
  > 정답 보기: https://tsch.js.org/599/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
