type Concat<T extends readonly any[], U extends readonly any[]> = 
  T extends [] ? U extends [] ? [] : U : [...T, ...U]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = [1] as const

type Arr = [1, 2, 3]
type Test = Arr[number]

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]

// @ts-expect-error
type error = Concat<null, undefined>

/*
  배운점
  - readonly any[] 타입은 any[] 타입보다 상위 타입. 따라서 readonly를 붙여주면 tuple, 일반 배열 모두 대응 가능
*/
