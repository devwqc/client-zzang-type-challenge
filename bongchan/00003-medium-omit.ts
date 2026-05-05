/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #보통 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Omit<T, K>`를 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/3/ko
*/

// 🚀 시작: 2026-05-05 11:49
// ✅ 종료: 2026-05-05 12:19
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. Mapped Types과 extends로 value를 never 처리
      - 아래와 같이 접근 했을 때 description: never; 이런식으로 key가 살아 있음
        type MyOmit<T, K extends keyof T> = {
          [Key in keyof T]: Key extends K ? never : T[Key];
        };

  😆 배움
    1. as 의 두 기능
      - 타입 단언(Type Assertion)
        - value as Type
        - 이 값을 X 타입이라고 간주
      - 키 재매핑(Key Remapping)
        - [P in keyof T as 새_키]
        - 결과 객체의 키를 이 값으로 바꾸기
        - [P in keyof T as P extends K ? never : P]: T[P];
          - P in keyof T로 선언한 각 P에 대해, as 뒤의 P extends K ? never : P 라는 표현식 전체를 평가한 결과로 키를 재매핑
    
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type T1 = MyOmit<Todo, 'description'>;
type T2 = MyOmit<Todo, 'description' | 'completed'>;
type T3 = MyOmit<Todo1, 'description' | 'completed'>;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Expected3 {
  readonly title: string;
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/3/answer/ko
  > 정답 보기: https://tsch.js.org/3/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
