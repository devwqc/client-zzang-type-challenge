/* _____________ Your Code Here _____________ */

// type MyOmit<T, K extends keyof T> = {
//   [key in keyof T extends K ? never : keyof T]: T[key]
// }
type MyOmit<T, K extends keyof T> = {
  [key in keyof T as (key extends K ? never : key)]: T[key]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}

/* 
  배운점: as 를 통해 뒷 부분을 먼저 판단 부분을 분리한다
*/
