import { Card } from './types';

type CardMatcher = (hand: Card[], comm: Card[]) => boolean;

const isOnePair: CardMatcher = (hand, comm) =>
  hand.filter((c, i) => [...hand.slice(i + 1), ...comm].filter(c2 => c.rank === c2.rank).length >= 1).length >= 1;

const isTwoPair: CardMatcher = (hand, comm) =>
  hand.filter((c, i) => [...hand.slice(i + 1), ...comm].filter(c2 => c.rank === c2.rank).length >= 1).length >= 2;

const isThreeOfAKind: CardMatcher = (hand, comm) =>
  hand.filter((c, i) => [...hand.slice(i + 1), ...comm].filter(c2 => c.rank === c2.rank).length >= 2).length >= 1;

const royal: Card['rank'][] = ['10', 'J', 'Q', 'K', 'A'];

const straights: Card['rank'][][] = [
  ['A', '2', '3', '4', '5'],
  ['2', '3', '4', '5', '6'],
  ['3', '4', '5', '6', '7'],
  ['4', '5', '6', '7', '8'],
  ['5', '6', '7', '8', '9'],
  ['6', '7', '8', '9', '10'],
  ['7', '8', '9', '10', 'J'],
  ['8', '9', '10', 'J', 'Q'],
  ['9', '10', 'J', 'Q', 'K'],
  royal,
];

const suites = ['clubs', 'spades', 'hearts', 'diamonds'];

const isStraight: CardMatcher = (hand, comm) =>
  straights.some(
    sRanks =>
      // MUST be at least one card in hand
      sRanks.some(sRank => hand.some(c => c.rank === sRank)) &&
      // MUST be every card in hand + comm
      sRanks.every(sRank => [...hand, ...comm].some(c => c.rank === sRank)),
  );

const isFlush: CardMatcher = (hand, comm) =>
  suites.some(
    suite =>
      // MUST be at least one card in hand
      hand.some(c => c.suit === suite) &&
      // MUST be every card in hand + comm
      [...hand, ...comm].filter(c => c.suit === suite).length >= 5,
  );

const isFullHouse: CardMatcher = (hand, comm) =>
  isOnePair([hand[0]], comm) &&
  isOnePair([hand[1]], comm) &&
  (isThreeOfAKind([hand[0]], comm) || isThreeOfAKind([hand[1]], comm));

const isFourOfAKind: CardMatcher = (hand, comm) =>
  hand.filter((c, i) => [...hand.slice(i + 1), ...comm].filter(c2 => c.rank === c2.rank).length >= 3).length >= 1;

const isStraightFlush: CardMatcher = (hand, comm) =>
  suites.some(suite =>
    straights.some(
      sRanks =>
        // MUST be at least one card in hand
        sRanks.some(sRank => hand.some(c => c.rank === sRank && c.suit === suite)) &&
        // MUST be every card in hand + comm
        sRanks.every(sRank => [...hand, ...comm].some(c => c.rank === sRank && c.suit === suite)),
    ),
  );

const isRoyalFlush: CardMatcher = (hand, comm) =>
  suites.some(
    suite =>
      // MUST be at least one card in hand
      royal.some(sRank => hand.some(c => c.rank === sRank && c.suit === suite)) &&
      // MUST be every card in hand + comm
      royal.every(sRank => [...hand, ...comm].some(c => c.rank === sRank && c.suit === suite)),
  );

const matchers: [number, CardMatcher][] = [
  [1, isOnePair],
  [2, isTwoPair],
  [3, isThreeOfAKind],
  [4, isStraight],
  [5, isFlush],
  [6, isFullHouse],
  [7, isFourOfAKind],
  [8, isStraightFlush],
  [9, isRoyalFlush],
];

export const checkCombinations = (...opts: Parameters<CardMatcher>): number =>
  Math.max(...matchers.map(([score, matcher]) => (matcher(...opts) ? score : 0)));
