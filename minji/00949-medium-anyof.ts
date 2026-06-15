/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array

  ### Question

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  For example:

  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]> // expected to be false.
  ```

  > View on GitHub: https://tsch.js.org/949
*/

/* _____________ Your Code Here _____________ */

type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? First extends 0 | false | '' | [] | Record<any, never> | undefined | null ? AnyOf<Rest> : true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/

/**
접근
1. type AnyOf<T extends readonly any[]> = T[number] extends true ? true : false
=> Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>만 정답
T[number] extends true는 T 배열 하나하나를 보지만 true에만 한정되어 있는 것 같다

2. type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? First extends true | 1 ? AnyOf<Rest> : false : T extends [infer First] ? First extends true ? true : false : false
=> 분기 처리가 반대로 되어있는 것 같다

3. type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? First extends true | 1 | string ? true : AnyOf<Rest> : false
=> Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false> 미통과

4. type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? First extends true | 1 | string ? First extends '' ? AnyOf<Rest> : true : AnyOf<Rest> : false
=> 더 많이 미통과....조건으로 truthy말고 falsy를 확인해보기

5. type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? First extends 0 | false | '' | [] | {} | undefined | null ? AnyOf<Rest> : true : false
=> {}는 null, undefined를 제외한 거의 모든 값을 의미 => { a: 1 } extends true 가 true임

6. 정답! type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? First extends 0 | false | '' | [] | Record<any, never> | undefined | null ? AnyOf<Rest> : true : false

 */
