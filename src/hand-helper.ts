import { Card } from './types';

type Rank = Card['rank'];

const unplayable: Rank[][] = [...Array.from({ length: 1 }).map((_, i) => ['3' as const, '4' as const])];

export const isBadHand = ([h1, h2]: [Card, Card]): boolean =>
  unplayable.some(([c1, c2]) => (c1 === h1.rank && c2 === h2.rank) || (c1 === h2.rank && c2 === h1.rank));
