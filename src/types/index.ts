export * from "./querytoken";
export * from "./velement";
export * from "./validation";
export * from "./formula";

export type Path = number[];
export type Collection = Path[];

import {QueryToken} from "./querytoken";

export type Selector = QueryToken[];

export type MatchResult = {
  result: Collection,
};

export type HistoryStep = {token: QueryToken, coll: Collection};
export type History = HistoryStep[];
