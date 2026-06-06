/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #보통 #object-keys

  ### 질문

  Union type의 key를 대체하는 ReplaceKeys를 구현하세요.
  만약 일부 유형에 해당 key가 존재하지 않는다면 대체하지 않습니다. 타입은 세 개의 인자를 받습니다.

  예시:

  ```ts
  type NodeA = {
    type: "A"
    name: string
    flag: number
  }

  type NodeB = {
    type: "B"
    id: number
    flag: number
  }

  type NodeC = {
    type: "C"
    name: string
    flag: number
  }

  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<
    Nodes,
    "name" | "flag",
    { name: number; flag: string }
  > // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
  ```

  > GitHub에서 보기: https://tsch.js.org/1130/ko
*/

// 🚀 시작: 2026-06-06 15:12
// ✅ 종료: 2026-06-06 15:30
// 🥺 정답 확인 여부: X

/*
  🤔 접근
    1. U extends U
      - 유니온 U를 분배해서 Mapped Types로 타입 좁히기

      1)

      type ReplaceKeys<U, T, Y> = U extends U
        ? {
            [P in keyof U]: P extends T ? (T extends keyof Y ? Y[T] : never) : U[P];
          }
        : never;

      - 다음과 같이 타입이 유니온으로 잡힌다.
        - T extends keyof Y에서 T가 유니온 타입이라서 그런듯

        type T1 = {
            type: "A";
            name: string | number;
            flag: string | number;
        } | {
            type: "B";
            id: number;
            flag: string | number;
        } | {
            type: "C";
            name: string | number;
            flag: string | number;
        }
      
      2) P extends T 일 때 T extends keyof Y가 아닌 P extends keyof Y로 접근
        - 이미 P를 T로 타입을 좁혔기 때문에 Y의 key에 타입이 좁혀지는지는 P로 확인해도 가능

        type ReplaceKeys<U, T, Y> = U extends U
          ? {
              [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
            }
          : never;

  😆 배움
    1. 다른 풀이
      - 나처럼 U extends U로 분배를 하지 않았다.
      - U가 유니온이면 Homomorphic Mapped Type으로 분배된다.

      type ReplaceKeys<U, T, Y> = {
        [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
      };
  
*/

/* _____________ 여기에 코드 입력 _____________ */

type ReplaceKeys<U, T, Y> = U extends U
  ? {
      [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
    }
  : never;

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type NodeA = {
  type: 'A';
  name: string;
  flag: number;
};

type NodeB = {
  type: 'B';
  id: number;
  flag: number;
};

type NodeC = {
  type: 'C';
  name: string;
  flag: number;
};

type ReplacedNodeA = {
  type: 'A';
  name: number;
  flag: string;
};

type ReplacedNodeB = {
  type: 'B';
  id: number;
  flag: string;
};

type ReplacedNodeC = {
  type: 'C';
  name: number;
  flag: string;
};

type NoNameNodeA = {
  type: 'A';
  flag: number;
  name: never;
};

type NoNameNodeC = {
  type: 'C';
  flag: number;
  name: never;
};

type Nodes = NodeA | NodeB | NodeC;
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC;
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB;

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>,
      ReplacedNodes
    >
  >,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
];

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/1130/answer/ko
  > 정답 보기: https://tsch.js.org/1130/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
