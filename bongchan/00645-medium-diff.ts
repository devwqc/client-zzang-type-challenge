/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #보통 #object

  ### 질문

  `O` & `O1`의 차이점인 `객체`를 가져옵니다

  > GitHub에서 보기: https://tsch.js.org/645/ko
*/

// 🚀 시작: 2026-05-31 15:54
// ✅ 종료: 2026-05-31 15:57
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Mapped Types + Intersection Types

      type Compute<T> = {
        [P in keyof T]: T[P];
      };

      type Diff<O, O1> = Compute<
        {
          [P in keyof O as P extends keyof O1 ? never : P]: O[P];
        } & {
          [P in keyof O1 as P extends keyof O ? never : P]: O1[P];
        }
      >;

  😆 배움
    1. 다른 풀이
      
      type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

      type Diff<O, O1> = {
        [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K];
      };

      type Foo = {
        name: string;
        age: string;
      };

      type Bar = {
        name: string;
        age: string;
        gender: number;
      };

      type result1 = keyof (Foo | Bar); // "name" | "age"
      type result2 = keyof (Foo & Bar); // "name" | "age" | "gender"

*/

/* _____________ 여기에 코드 입력 _____________ */

type Compute<T> = {
  [P in keyof T]: T[P];
};

type Diff<O, O1> = Compute<
  {
    [P in keyof O as P extends keyof O1 ? never : P]: O[P];
  } & {
    [P in keyof O1 as P extends keyof O ? never : P]: O1[P];
  }
>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/645/answer/ko
  > 정답 보기: https://tsch.js.org/645/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
