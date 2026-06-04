type StringToArray<S extends string> = S extends `${string}${infer R}` ? [0, ...StringToArray<R>] : [];
type LengthOfString<S extends string> = StringToArray<S>['length']

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/*
  배운점
  - string 타입의 length 는 number를 반환하고 array length는 number가 아님
*/
