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

// 🚀 시작: 2026-05-09 13:21
// ✅ 종료: 2026-05-09 13:51
// 🥺 정답 확인 여부: O

/*
  🤔 접근
    1. 제네릭을 주입하는 케이스 대응
      - declare function PromiseAll<R extends any[]>(values: any): any;

    2. 반환타입을 Promise 설정
      - declare function PromiseAll<R extends any[]>(values: R): Promise<R>;
        - PromiseAll에 Promise.resolve가 들어오는 케이스 대응되지 않음

  😆 배움
  
    1. Homomorphic mapped types(동형 매핑)
      - keyof T 의 T 가 튜플/배열일 때, 매핑된 타입을 튜플/배열로 그대로 보존
      - 동형 매핑은 반드시 [K in keyof T] 형태일 때만 유지
      - 일반 객체
        type Obj = { a: 1; b: 2 };
        type Mapped = { [K in keyof Obj]: Obj[K] };
        // 결과: { a: 1; b: 2 } ← 객체
      - 튜플
        type Tup = [1, 2, 3];
        type Mapped = { [K in keyof Tup]: Tup[K] };
        // 결과: [1, 2, 3] ← 튜플! (객체 X)
      - 배열
        type Arr = number[];
        type Mapped = { [K in keyof Arr]: Arr[K] };
        // 결과: number[] ← 배열!


    - 다른 풀이

    declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
      [P in keyof T]: T[P] extends Promise<infer R> | infer R ? R : never
    }>

*/

/* _____________ Your Code Here _____________ */

declare function PromiseAll<T extends any[]>(
  values: readonly [...T],
): Promise<{
  [key in keyof T]: Awaited<T[key]>;
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([
  1,
  2,
  Promise.resolve('3'),
]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/
