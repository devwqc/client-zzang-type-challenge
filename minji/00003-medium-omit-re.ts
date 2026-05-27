/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */

type MyOmit<T, K extends keyof T> = {[key in keyof T as key extends K ? never : key] : T[key]}

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

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근
1. K에 포함되는 것과 포함되지않는 것을 나누기
type MyOmit<T, K extends keyof T> = {[key in keyof T] : T[key]} & {[key in keyof T as K] : never}
- &로 묶어도 평탄화되지 않음. 교집합으로 인식됨
*/
