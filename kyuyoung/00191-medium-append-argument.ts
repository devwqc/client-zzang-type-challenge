type AppendArgument<Fn extends Function, A> = 
  Fn extends (...arg: infer Argument) => infer R 
    ? (...arg: [...Argument, A]) => R 
    : never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

/*
  배운점
  - Fn extends Function으로 Generic 부분을 제한해야 expect error 발생
*/
