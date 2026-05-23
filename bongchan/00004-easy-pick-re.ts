/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #쉬움 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/4/ko
*/

// 🚀 시작: 2026-05-23 23:36
// ✅ 종료: 2026-05-23 23:40
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Mapped Type

      type MyPick<T, K> = {
        [P in keyof T as P extends K ? P : never]: T[P];
      };

      - 제네릭 K에 keyof T가 아닌 값이 들어갔을 때 에러가 발생해야함
        - K를 keyof K의 부분집합으로 제한

          type MyPick<T, K extends keyof T> = {
            [P in keyof T as P extends K ? P : never]: T[P];
          };
    
    2. 제네릭 K를 keyof T의 부분집합으로 받기
      - Mapped Type을 사용할 때 유니온 K를 활용하여 property 구성

      type MyPick<T, K extends keyof T> = {
        [P in K]: T[P];
      };

  😆 배움
    
  
*/

/* _____________ 여기에 코드 입력 _____________ */

// 접근 1
// type MyPick<T, K extends keyof T> = {
//   [P in keyof T as P extends K ? P : never]: T[P];
// };

// 접근 2
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/4/answer/ko
  > 정답 보기: https://tsch.js.org/4/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
