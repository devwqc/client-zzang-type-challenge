/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<O, O1> = {[key in keyof (O & O1) as key extends keyof O ? key extends keyof O1 ? never : key : key]: (O & O1)[key]}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
/**
 접근
 1. type Diff<O, O1> = {[key in keyof (O & O1)]: key extends O ? key extends O1 ? never : O[key] : key extends O1 ? O1[key] : never}
=> Type 'key' cannot be used to index type 'O'. 에러: key는 O 또는 O1의 키인데 TS는 key가 O의 key인지 확신하지 못해 O[key]에서 에러 발생
=> key를 없애는 방향으로 가기
 */
