// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false
type Includes<T extends readonly any[], U> = {
  [key in T[number]]: true
}[U] extends true ? true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,

/*
  배운점
  - 처음 접근은 주석 처리한 대로 배열을 유니온 타입으로 바꿔 extends 하는 식으로 접근했지만, 그러면 object 케이스 같은 경우 통과가 안됨
  - 두번째는 배열 유니온 타입을 key로 가지는 객체 타입을 만들고, 해당 key가 존재하는지 체크 하는식으로 접근, 하지만 이 때도
    Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>
    Expect<Equal<Includes<[1 | 2], 1>, false>>
    이 두 가지 케이스가 통과가 안됨
  - 결국 정답 확인했는데도 아직 이해를 못했습니다 ㅜ
*/
