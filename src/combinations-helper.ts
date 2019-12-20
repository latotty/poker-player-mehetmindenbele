import { Card, Combination } from './types';

type CardMatcher = (hand: Card[], comm: Card[]) => boolean;

const containsCard = (card: Card, cards: Card[]): boolean =>
  cards.some(c => c.rank === card.rank && c.suit === card.suit);
const deckIntercept = (cards1: Card[], cards2: Card[]): boolean => cards1.some(c => containsCard(c, cards2));

const suites = ['clubs', 'spades', 'hearts', 'diamonds'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
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

const isOnePair: CardMatcher = (hand, comm) =>
  ranks
    // collect cards for each rank
    .map(rank => [...hand, ...comm].filter(c => c.rank === rank))
    .filter(
      rankDeck =>
        // should be at least 2
        rankDeck.length >= 2 &&
        // should have at least one card in our hand
        deckIntercept(rankDeck, hand),
      // should be at least 1 set
    ).length >= 1;

const isTwoPair: CardMatcher = (hand, comm) =>
  ranks
    .map(rank => [...hand, ...comm].filter(c => c.rank === rank))
    .filter(
      rankDeck =>
        // should be at least 2
        rankDeck.length >= 2 &&
        // should have at least one card in our hand
        deckIntercept(rankDeck, hand),
      // should be at least 2 sets
    ).length >= 2;

const isThreeOfAKind: CardMatcher = (hand, comm) =>
  ranks
    .map(rank => [...hand, ...comm].filter(c => c.rank === rank))
    .filter(
      rankDeck =>
        // should be at least 3
        rankDeck.length >= 3 &&
        // should have at least one card in our hand
        deckIntercept(rankDeck, hand),
      // should be at least 1 set
    ).length >= 1;

const isStraight: CardMatcher = (hand, comm) =>
  straights
    .map(sRanks => ({
      sRanks,
      // collect cards for each rank in straight
      deck: [...hand, ...comm].filter(c => sRanks.some(rank => c.rank === rank)),
    }))
    .filter(
      ({ sRanks, deck }) =>
        // should be a full straight
        sRanks.every(rank => deck.some(dc => dc.rank === rank)) &&
        // should have at least one card in our hand
        deckIntercept(deck, hand),
      // should be at least 1 set
    ).length >= 1;

const isFlush: CardMatcher = (hand, comm) =>
  suites
    // collect cards for each suite
    .map(suite => [...hand, ...comm].filter(c => c.suit === suite))
    .filter(
      suiteDeck =>
        // at least 5 cards
        suiteDeck.length >= 5 &&
        // should have at least one card in our hand
        deckIntercept(suiteDeck, hand),
      // should be at least 1 set
    ).length >= 1;

const isFullHouse: CardMatcher = (hand, comm) =>
  isOnePair([hand[0]], comm) &&
  isOnePair([hand[1]], comm) &&
  (isThreeOfAKind([hand[0]], comm) || isThreeOfAKind([hand[1]], comm));

const isFourOfAKind: CardMatcher = (hand, comm) =>
  ranks
    .map(rank => [...hand, ...comm].filter(c => c.rank === rank))
    .filter(
      rankDeck =>
        // should be at least 4
        rankDeck.length >= 4 &&
        // should have at least one card in our hand
        deckIntercept(rankDeck, hand),
      // should be at least 1 set
    ).length >= 1;

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

const matchers: [Combination, CardMatcher][] = [
  [Combination.Pair, isOnePair],
  [Combination.TwoPair, isTwoPair],
  [Combination.ThreeOfAKind, isThreeOfAKind],
  [Combination.Straight, isStraight],
  [Combination.Flush, isFlush],
  [Combination.FullHouse, isFullHouse],
  [Combination.FourOfAKind, isFourOfAKind],
  [Combination.StraightFlush, isStraightFlush],
  [Combination.RoyalFlush, isRoyalFlush],
];

export const getCombinations = (...opts: Parameters<CardMatcher>): Combination[] =>
  matchers.filter(([_, matcher]) => matcher(...opts)).map(([comb]) => comb);
