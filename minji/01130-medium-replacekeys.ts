/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #medium #object-keys

  ### Question

  Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
  A type takes three arguments.

  For example:

  ```ts
  type NodeA = {
    type: "A"
    name: string
    flag: number
  }

  type NodeB = {
    type: "B"
    id: number
    flag: number
  }

  type NodeC = {
    type: "C"
    name: string
    flag: number
  }

  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<
    Nodes,
    "name" | "flag",
    { name: number; flag: string }
  > // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
  ```

  > View on GitHub: https://tsch.js.org/1130
*/

/* _____________ Your Code Here _____________ */

type ReplaceKeys<U, T, Y extends Record<string, any>> = U extends U ? {[key in keyof U]: key extends T ? key extends keyof Y ? Y[key] : never : U[key]} : never
type a = ReplaceKeys<Nodes, 'name' | 'flag', { name: number, flag: string }>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number, flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1130/answer
  > View solutions: https://tsch.js.org/1130/solutions
  > More Challenges: https://tsch.js.org
*/

/**
접근
1. U를 분해하기
type ReplaceKeys<U, T, Y extends Record<string, any>> = T extends T ? {[key in keyof U]: key extends T ? T extends keyof Y ? Y[T] : never : U[key]} : never
=> 첫 번째 인자와 두 번째 인자가 각각 들어감 => 6개의 타입을 갖는 유니온 생성
: T 개수만큼 반복되었던 것

2. 반복 줄이기: U를 분해, key 사용하기
정답) type ReplaceKeys<U, T, Y extends Record<string, any>> = U extends U ? {[key in keyof U]: key extends T ? key extends keyof Y ? Y[key] : never : U[key]} : never
key를 순회하여 Y에서 key를 꺼내기 (Y[key])

 */
