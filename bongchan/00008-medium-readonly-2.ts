/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #보통 #readonly #object-keys

  ### 질문

  `T`에서 `K` 프로퍼티만 읽기 전용으로 설정해 새로운 오브젝트 타입을 만드는 제네릭 `MyReadonly2<T, K>`를 구현하세요. `K`가 주어지지 않으면 단순히 `Readonly<T>`처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > GitHub에서 보기: https://tsch.js.org/8/ko
*/

// 🚀 시작: 2026-05-05 17:51
// ✅ 종료: 2026-05-05 18:14
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. error 케이스에 대응하기 위해서 제네릭 K 를 extends typeof T 로 접근
      - type MyReadonly2<T, K extends keyof T> = any;
        - 이렇게 되면 MyReadonly2<Todo1>; 에서 제네릭 형식에 2 형식 인수가 필요하다는 에러 발생
        - 제네릭 K 를 옵셔널로 설정하는 방법은?
          - 기본값 never 를 두고 T[K] 를 never 로 extends 해서 분기처리 해보자

  😆 배움
    1. 제네릭에 extends 로 타입 제한과 = 를 활용한 기본값을 부여하면 옵셔널이면서 타입을 제한할 수 있음
      - 기본값을 활용한 더 간결한 풀이가 가능해서 다시 풀어보자
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyReadonly2<T, K extends keyof T = never> = T[K] extends never
  ? {
      readonly [P in keyof T]: T[P];
    }
  : {
      [P in keyof T as P extends K ? never : P]: T[P];
    } & {
      readonly [P in K]: T[P];
    };

/* _____________ 테스트 케이스 _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>,
];

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/8/answer/ko
  > 정답 보기: https://tsch.js.org/8/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
