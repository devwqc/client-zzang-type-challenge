/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #보통 #application

  ### 질문

  체인 가능 옵션은 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?

  이 챌린지에서는 `option(key, value)`과 `get()` 두가지 함수를 제공하는 객체(또는 클래스) 타입을 구현해야 합니다. 현재 타입을 `option`으로 지정된 키와 값으로 확장할 수 있고 `get`으로 최종 결과를 가져올 수 있어야 합니다.

  예시

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 결과는 다음과 같습니다:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  문제를 해결하기 위해 js/ts 로직을 작성할 필요는 없습니다. 단지 타입 수준입니다.

  `key`는 `string`만 허용하고 `value`는 무엇이든 될 수 있다고 가정합니다. 같은 `key`는 두 번 전달되지 않습니다.

  > GitHub에서 보기: https://tsch.js.org/12/ko
*/

// 🚀 시작: 2026-05-08 12:03
// ✅ 종료: 2026-05-08 12:19
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. Chainable 타입에 object 제네릭 추가
      - get 메서드를 활용해서 object 반환

      type Chainable<R = object> = {
        option(key: string, value: any): any;
        get(): R;
      };

    2. option 메서드에 매개변수 제네릭 추가
      - value의 타입을 추론하기 위함

      type Chainable<R = object> = {
        option<K extends string, V>(key: K, value: V): any;
        get(): R;
      };

    3. option 메서드의 반환 타입으로 Chainable 추가
      - option 메서드 이후로 option, get 메서드를 체이닝하기 위함

      type Chainable<R = object> = {
        option<K extends string, V>(
          key: K,
          value: V,
        ): Chainable<
          R & {
            [P in K]: V;
          }
        >;
        get(): R;
      };

    4. option 메서드의 매개변수 key 타입을 keyof R 로 조건부 타입 설정
      - 동일한 key 가 들어왔을 때, 에러 처리

      type Chainable<R = object> = {
        option<K extends string, V>(
          key: K extends keyof R ? never : K,
          value: V,
        ): Chainable<
          R & {
            [P in K]: V;
          }
        >;
        get(): R;
      };

    5. option 메서드의 반환 타입 Chainable 에 제네릭을 넘겨줄 때, Omit<R, K> 로 이전에 있던 key 제거
      - 동일한 key 를 option 메서드로 넣었을 때, 마지막 value 타입 추론되게 설정

      type Chainable<R = object> = {
        option<K extends string, V>(
          key: K extends keyof R ? never : K,
          value: V,
        ): Chainable<
          Omit<R, K> & {
            [P in K]: V;
          }
        >;
        get(): R;
      };

  😆 배움
    - 타입만 사용해서 체이닝을 구현할 수 있구나...
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type Chainable<R = object> = {
  option<K extends string, V>(
    key: K extends keyof R ? never : K,
    value: V,
  ): Chainable<
    Omit<R, K> & {
      [P in K]: V;
    }
  >;
  get(): R;
};

/* _____________ 테스트 케이스 _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

declare const a: Chainable;

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get();

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get();

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/12/answer/ko
  > 정답 보기: https://tsch.js.org/12/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
