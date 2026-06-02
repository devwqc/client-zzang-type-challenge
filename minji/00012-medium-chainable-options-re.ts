/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application

  ### Question

  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?

  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.

  For example

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  You don't need to write any js/ts logic to handle the problem - just in type level.

  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.

  > View on GitHub: https://tsch.js.org/12
*/

/* _____________ Your Code Here _____________ */

type Chainable<T extends Record<string, any> = {}> = {
  option<K extends string, V = any>(
    key: K extends keyof T ? never : K,
    value: V,
  ): K extends keyof T
    ? Chainable<Omit<T, K> & Record<K, V>>
    : Chainable<T & { [key in K]: V }>;
  get(): T;
};

/* _____________ Test Cases _____________ */
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

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/

/*
Omit, Record 등 유틸리티 타입을 한 번에 구현하기보다 나눠서 구현하기
처음부터 Omit 구현하려 하지 말고 순차적으로 진행

type Chainable<T extends Record<string, any> = {}> = {
  option<K extends string, V = any>(key: K, value: V): K extends keyof T ? Chainable<Omit<T, K> & Record<K, V>> : Chainable<T & {[key in K]: V}>
  get(): T
}
- ts-error가 발생하지 않은 이유: key:K에 never 파라미터를 넣지 않았기 때문
=> 조건문으로 K가 keyof T에 속하면 never로 추론이 되도록 설정해야 함
*/
