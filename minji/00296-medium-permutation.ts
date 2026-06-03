/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #보통 #union

  ### 질문

  주어진 유니언 타입을 순열 배열로 바꾸는 Permutation 타입을 구현하세요.


  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > GitHub에서 보기: https://tsch.js.org/296/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Permutation<T, C = T> = [T] extends [never] ? [] :  C extends C ? [C, ...Permutation<Exclude<T, C>>] : [] 

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/296/answer/ko
  > 정답 보기: https://tsch.js.org/296/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/*
접근

순열 => 재귀
튜플 T를 하나씩 보려면? => T extends infer U

1. type Permutation<T> = T extends infer U ? [U] : never
- 재귀를 어떻게 돌 것인가...

2. type Permutation<T> = T extends infer U ? [U, Permutation<Exclude<T, U>>] : never
- Permutation<'A'> 결과값이 ['A', never]로 나온다
- 빈 값이 넘어가는 경우 대응 필요
- Exclude<'A', 'A'> = never

- 유니온 타입에서 특정 값을 제거하려는 경우 Exclude를 쓰고, 객체에서 제거하려면 Omit을 쓴다 (너무 헷갈림 ㅠ)

3. type Permutation<T> = T extends never ? [] :  T extends infer U ? [U, Permutation<Exclude<T, U>>] : []
- T extends never에서, T가 never이면 extends로 분배할 멤버가 0개라 이 조건문 자체가 사라짐
- 대안: []로 묶기

4. type Permutation<T> = [T] extends [never] ? [] :  T extends infer U ? [U, ...Permutation<Exclude<T, U>>] : []
- Permutation<'A' | 'B' | 'C'> = ["A"] | ["B"] | ["C"] 가 된다
- 원인: T extends infer U에서 T가 현재 멤버 하나로 좁혀진다 => 'A' or 'B' or 'C'가 됨
- 전체 튜플과 현재 튜플을 구분해야 한다

5. 답 : type Permutation<T, C = T> = [T] extends [never] ? [] :  C extends C ? [C, ...Permutation<Exclude<T, C>>] : [] 
- C extends C: extends로 C를 하나씩 분배함 - 앞의 C와 뒤의 C가 동일한 이유는 항상 참이 되도록 만들어주기 위해서.

*/
