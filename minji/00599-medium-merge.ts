/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type Merge<F, S> = {[key in keyof F | keyof S]: key extends keyof S ? S[key] : key extends keyof F ? F[key]: never}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/

/**
접근
1. type Merge<F, S> = {[key in keyof F extends keyof S ? never : keyof F]: F[key]} & S
=> keyof F extends keyof S는 유니온 전체 vs 유니온 전체 비교

2. type Merge<F, S> = {[key in keyof F | keyof S]: key extends keyof F ? F[key] : key extends keyof S ? S[key]: never}
=> 결과가 이렇게 나온다 {
    a: number;
    b: string;
    c: boolean;
}
=> S를 앞으로 보내기

 */
