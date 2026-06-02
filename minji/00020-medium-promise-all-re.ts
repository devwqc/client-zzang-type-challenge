/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

declare function PromiseAll<T extends any[]>(values: [...T]): Promise<{ [key in keyof T]: Awaited<T[key]>}>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([1, 2, Promise.resolve('3')])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/

/*
mapped type: 어떤 타입의 모든 키(속성/인덱스)를 순회하면서, 새 타입을 만들어내는 문법

- 객체, 배열에도 사용 가능하다

ex:
type Doubled<T extends readonly number[]> = { [K in keyof T]: [T[K], T[K]] }

type R = Doubled<[1, 2, 3]>
// [[1, 1], [2, 2], [3, 3]]


정답:
declare function PromiseAll<T extends any[]>(values: [...T]): Promise<{ [key in keyof T]: Awaited<T[key]>}>
values: [...T] — variadic tuple
- [1, 2, 3] as const가 [1,2,3]으로 추론됨
- [1, 2, Promise.resolve(3)]가 [number, number, Promise<number>]인 튜플로 추론됨

 */
