/* _____________ Your Code Here _____________ */

type MyReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never
args를 달아야하는군!

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
]

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2

/*
  배운점: ...args: any를 추가해줘야한다. 저 부분을 통해 args가 있는 함수와 아닌걸 extends가 판단하고 분리함
*/
