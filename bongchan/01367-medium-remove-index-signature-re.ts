/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #보통 #object-keys

  ### 질문

  객체 유형에서 인덱스 시그니처를 제외하는 `RemoveIndexSignature<T>`를 구현하세요

  예시:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > GitHub에서 보기: https://tsch.js.org/1367/ko
*/

// 🚀 시작: 2026-06-19 22:45
// ✅ 종료: 2026-06-19 23:06
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. 인덱스 시그니처는 Mapped Types를 돌 때 무슨 타입이 나올까?

      type RemoveIndexSignature<T> = {
        [K in keyof T]: K;
      };

      type T1 = RemoveIndexSignature<Foo>; // { [x: string]: string; foo: "foo"; }
      type T2 = RemoveIndexSignature<Bar>; // { [x: number]: number; bar: "bar"; 0: 0; }

  😆 배움
    - 다른 풀이

      type RemoveIndexSignature<T, P = PropertyKey> = {
        [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
      };
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as K extends P ? (P extends K ? never : K) : K]: T[K];
};

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol('foobar');
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/1367/answer/ko
  > 정답 보기: https://tsch.js.org/1367/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
