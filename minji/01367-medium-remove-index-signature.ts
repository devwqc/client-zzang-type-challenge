/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

type IsIndexKey<K> =
  string extends K ? true :
  number extends K ? true :
  symbol extends K ? true :
  false

type RemoveIndexSignature<T> = {
  [K in keyof T as IsIndexKey<K> extends true ? never : K]: T[K]
}
type a = RemoveIndexSignature<Bar>
type b = keyof Foo
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

/**
접근
1. type RemoveIndexSignature<T> = {[key in keyof T as key extends Object ? never : key]: T[key]}
=> foo()도 걸러진다
=> Function은 걸러지지 않게 하고, index signature만 걸러져야 한다.
문제점: foo()가 keyof T에서 'foo' 리터럴 타입이 되고 (string), string은 Object를 extends함 => foo까지 never가 된다
=> 리터럴 키와 index sig 키를 어떻게 구분하는가.
=> index signature 키는 string | number | symbol 타입임

2. 방향을 바꿔 비교해보기
type RemoveIndexSignature<T> = {[key in keyof T as string extends key ? never : key]: T[key]}
=> [key: number]: any가 안 걸러짐

3. number, symbol, string 각각 비교하기 (정답)
type RemoveIndexSignature<T> = {[key in keyof T as string extends key ? never : symbol extends key ? never : number extends key ? never : key]: T[key]}
=> 지저분하다 한번에 분배하는 방법은 없을까
=> 이런 방법도 있다:
type IsIndexKey<K> =
  string extends K ? true :
  number extends K ? true :
  symbol extends K ? true :
  false

type RemoveIndexSignature<T> = {
  [K in keyof T as IsIndexKey<K> extends true ? never : K]: T[K]
}
 */
