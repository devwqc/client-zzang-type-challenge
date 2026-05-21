/* _____________ Your Code Here _____________ */

type LookUp<U extends { type: string }, T extends U['type']> = U extends { type: T } ? U : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]

/*
  배운점
  - T extends U['type'] 을 함으로써 type에 정의된 Union type만 T에 전달 가능하도록 한정시킬 수 있다
*/
