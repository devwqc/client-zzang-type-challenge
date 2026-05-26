/*
  106 - Trim Left
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

  For example

  ```ts
  type trimmed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
  ```

  > View on GitHub: https://tsch.js.org/106
*/

/* _____________ Your Code Here _____________ */

type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/106/answer
  > View solutions: https://tsch.js.org/106/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근 1: 재귀적으로 돌기
type TrimLeft<S extends string> = S extends ' ' + {나머지} ? TrimLeft<나머지> : S
- ' ' + {나머지}와 같이 공백이나 \n, \t를 어떻게 풀 것인가?
=> ${' ' | '\n' | '\t'}로 분리
*/
