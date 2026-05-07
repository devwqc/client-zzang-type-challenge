type If<C extends boolean, T, F> = C extends true ? T : C extends false ? F : T | F

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>

/*
  배운점
  - true, false보다 boolean은 상위 타입. 그러므로 하위 타입부터 extends 분기 처리해줘야함
*/
