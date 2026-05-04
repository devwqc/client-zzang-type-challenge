/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #easy #infer #tuple #built-in

  ### Question

  Implement the built-in Parameters<T> generic without using it.

  For example:

  ```ts
  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  ```

  > View on GitHub: https://tsch.js.org/3312
*/

/* _____________ Your Code Here _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3312/answer
  > View solutions: https://tsch.js.org/3312/solutions
  > More Challenges: https://tsch.js.org
*/

/*
배운 점
- 아예 모르겠어서 답을 봤다..!
- MyParameters가 받는 타입 T는 함수 타입인 상태

- infer: 여기 들어올 타입을 알아서 추론해달라는 뜻
  - ex. type Example<T> = T extends (infer Item)[] ? Item : never =====> (infer Item)[]: T는 배열인데, 그 안의 요소 타입을 Item이라고 부를게 라는 뜻!!
  - ex. type ExampleForReturn<T> = T extends (...args: any[]) => infer R ? R : never =====> (...args: any[]) => infer R: T는 함수인데, 그 함수의 반환 타입을 R이라고 부를게 라는 뜻!!
- 그렇다면 Parameter를 구하려면? return이 아니라 매개변수 자리에 infer를 쓰면 됨
  - T extends (...args: infer P) => any ? P : never ===> args가 P 타입으로 추론되면 튜플 타입인 P를 반환한다 ([string, number, ...])
*/
