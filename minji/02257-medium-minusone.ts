/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type Decreased = {
  '0': '9',
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5'
  '7': '6'
  '8': '7'
  '9': '8'
}

type StringToNumber<S extends string> = S extends `${infer Str extends number}` ? Str : never

// [앞 글자, 끝 글자]로 나누기 ex. '100' -> ['10', '0']
type SplitLast<S extends string, Head extends string = ""> =
    S extends `${infer A}${infer B}`
      ? B extends ""
        ? [Head, A]                   
        : SplitLast<B, `${Head}${A}`> 
      : [Head, ""]

type MinusOneStr<S extends string> =
    SplitLast<S> extends [infer Head extends string, infer Last extends string]
      ? Last extends '0'
        ? `${MinusOneStr<Head>}9`            // 끝이 0이면 한자리 내림, 끝은 9
        : Last extends keyof Decreased
          ? `${Head}${Decreased[Last]}`      // 끝이 0이 아니면 마지막 자리만 내림
          : never
      : never

type TrimLeadingZeros<S extends string> =
  S extends `0${infer Rest}`
    ? Rest extends "" ? "0" : TrimLeadingZeros<Rest>  // "0" 자체는 보존
    : S

type MinusOne<T extends number> =
  StringToNumber<TrimLeadingZeros<MinusOneStr<`${T}`>>>
  
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/

/**
어렵다 ㅠㅠ

접근
1. 9_007_199_254_740_992를 문자열로 변환해야 되나? => `${T}` 사용
=> 숫자에서 1을 어떻게 빼지?
=> 문자를 변환?

2. type Decreased에 매핑하려면 extends keyof Decreased 활용
2-1. 문자열을 숫자로 변환하기: type StringToNumber<S extends string> = S extends `${infer Str extends number}` ? Str : never


 */
