export * from './querytoken';
export * from './velement';

export type Path = number[];
export type Collection = Path[];

import {QueryToken} from './querytoken';

export type Selector = QueryToken[];