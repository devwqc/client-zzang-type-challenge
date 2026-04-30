/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is a wrapped type like Promise, how can we get the type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

// Promise를 재귀로 풀기
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/

/*
배운 점
- 결국 답을 살짝 참고해서 PromiseLike를 찾아냈다.
- PromiseLike: 어떤 객체든 .then() 메서드를 갖고 있으면 Promise로 인정해 주는데, 이를 Thenable 객체라고 부른다. PromiseLike는 이런 객체를 의미하는 내장 인터페이스.
- Promise: PromiseLike를 상속받고, 여기에 추가로 catch와 finally 메서드를 더 갖고 있는 구조.

1. T extends PromiseLike<infer U>: 전달받은 T가 PromiseLike 타입이면 infer U로 T의 타입 (PromiseLike가 전달받은 타입)을 추론
1-1. 참일 경우: T도 PromiseLike 타입이므로 재귀 실행
1-2. 거짓일 경우: T가 PromiseLike 타입이 아니므로 T 반환

- 중첩된 Promise를 해제하기 위해서 재귀 실행
*/
