type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

/*
  배운점
  - infer을 활용하기 위해 무의미하지만 extends 를 활용하여 infer 타입을 만든 뒤 반환하는 방식
*/
