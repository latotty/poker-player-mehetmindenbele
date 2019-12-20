import { Card } from './types';

type CardMatcher = (
  hand: [Card, Card],
  comm: [Card, Card, Card] | [Card, Card, Card, Card] | [Card, Card, Card, Card, Card],
) => boolean;

const isOnePair: CardMatcher = (hand, comm) =>
  hand.filter(c => [...hand, ...comm].filter(c2 => c.rank === c2.rank).length >= 2).length >= 1;

const isTwoPair: CardMatcher = (hand, comm) =>
  hand.filter(c => [...hand, ...comm].filter(c2 => c.rank === c2.rank).length >= 2).length >= 2;

const isThreeOfAKind: CardMatcher = (hand, comm) =>
  hand.filter(c => [...hand, ...comm].filter(c2 => c.rank === c2.rank).length >= 3).length >= 1;

const matchers: [number, CardMatcher][] = [
  [1, isOnePair],
  [2, isTwoPair],
  [3, isThreeOfAKind],
];

export const checkCombinations = (...opts: Parameters<CardMatcher>): number =>
  Math.max(...matchers.map(([score, matcher]) => (matcher(...opts) ? score : 0)));
