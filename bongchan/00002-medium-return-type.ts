/*
  2 - Get Return Type
  -------
  by Anthony Fu (@antfu) #보통 #infer #built-in

  ### 질문

  내장 제네릭 `ReturnType<T>`을 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

  type a = MyReturnType<typeof fn> // should be "1 | 2"
  ```

  > GitHub에서 보기: https://tsch.js.org/2/ko
*/

// 🚀 시작: 2026-05-03 21:57
// ✅ 종료: 2026-05-03 22:01
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. return 타입에 infer 사용
      - type MyReturnType<T extends () => unknown> = T extends () => infer R ? R : unknown;
        - 아래 두 예제에서 Parameters 때문에 에러 발생
          - Expect<Equal<1 | 2, MyReturnType<typeof fn>>>
          - Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
      - Rest Parameters를 처리하는 방향 생각

  😆 배움
    1. 공변, 반공변
      - 매개변수
        - 더 좁은 타입: ❌ (반공변)
        - 더 넓은 타입: ✅
      - 반환값
        - 더 좁은 타입: ✅ (공변)
        - 더 넓은 타입: ❌

      - TypeScript의 함수 매개변수는 반공변(contravariant)
        - unknown은 최상위 타입으로 만약 ...args: unknown 타입을 지정하면 fn, fn1의 boolean 타입 매개변수가 더 하위 타입이라 에러 발생
      - 반환 타입은 공변(covariant)
        - 반환을 받는 입장에서는 변수 할당과 똑같음
      - (a: A) => R1 를 (b: B) => R2 에 할당 가능?
        ─ 매개변수: B extends A (반공변, 반대 방향)
        ─ 반환값: R1 extends R2 (공변, 같은 방향)

        type GetAnimal = () => Animal;

        // ✅ OK: Dog extends Animal (공변 방향)
        const f1: GetAnimal = (): Dog => new Dog();

        // ❌ Error: Animal은 Dog가 아님
        const f2: () => Dog = (): Animal => new Animal();

        type Handler = (x: Animal) => Animal;

        // 매개변수 자리: 더 좁은 타입은 ❌
        const h1: Handler = (x: Dog) => x;
        // 호출자가 h1(new Cat()) 호출 가능 → x: Dog인데 Cat 들어옴 → 💥

        // 반환 자리: 더 좁은 타입은 ✅
        const h2: Handler = (x: Animal): Dog => new Dog();
        // 호출자가 받는 값은 Animal로 다뤄지므로 Dog여도 안전        
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyReturnType<T extends (...args: any) => unknown> = T extends (
  ...args: any
) => infer R
  ? R
  : unknown;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
];

type ComplexObject = {
  a: [12, 'foo'];
  bar: 'hello';
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/2/answer/ko
  > 정답 보기: https://tsch.js.org/2/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
