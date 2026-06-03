/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

type StringToTuple<S extends string, R extends string[] = []> = S extends `${infer First}${infer Rest}` ? StringToTuple<Rest, [...R, First]> : R

type LengthOfString<S extends string> = StringToTuple<S>['length']
type a = LengthOfString<'reina'>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/

/*
접근

1. S['length']는 타입이 number인 이유
- S가 제네릭이기 때문에 string.length라고 인식 => number로 추론됨
- 구체적인 숫자로 리턴하려면: 튜플의 length를 구하기
=> S를 튜플로 변환하기

2. type StringToTuple<S extends string, R extends string[] = []> = S extends `${infer First}${infer Rest}` ? StringToTuple<Rest, [First]> : R
type LengthOfString<S extends string> = StringToTuple<S>['length']
=> LengthOfString<'kumiko'> 타입이 1이 됨

3. ...R 추가
type StringToTuple<S extends string, R extends string[] = []> = S extends `${infer First}${infer Rest}` ? StringToTuple<Rest, [...R, First]> : R
type LengthOfString<S extends string> = StringToTuple<S>['length']

 */
