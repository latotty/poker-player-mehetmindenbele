import 'jest';
import { getCombinations } from './combinations-helper';
import { Combination } from './types';

const cases: {
  combinations: Combination[];
  hand: Parameters<typeof getCombinations>[0];
  comm: Parameters<typeof getCombinations>[1];
}[] = [
  {
    hand: [
      { rank: '5', suit: 'spades' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [],
    combinations: [Combination.Pair],
  },
  {
    hand: [
      { rank: '7', suit: 'hearts' },
      { rank: 'K', suit: 'clubs' },
    ],
    comm: [
      { rank: '9', suit: 'hearts' },
      { rank: '10', suit: 'clubs' },
      { rank: '10', suit: 'spades' },
      { rank: '7', suit: 'clubs' },
    ],
    combinations: [Combination.Pair],
  },
  {
    hand: [
      { rank: '7', suit: 'hearts' },
      { rank: 'K', suit: 'clubs' },
    ],
    comm: [
      { rank: '9', suit: 'hearts' },
      { rank: '10', suit: 'clubs' },
      { rank: 'K', suit: 'spades' },
      { rank: '7', suit: 'clubs' },
    ],
    combinations: [Combination.Pair, Combination.TwoPair],
  },
  {
    hand: [
      { rank: '5', suit: 'spades' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [
      { rank: '9', suit: 'hearts' },
      { rank: '10', suit: 'clubs' },
      { rank: '10', suit: 'spades' },
      { rank: '5', suit: 'clubs' },
    ],
    combinations: [Combination.Pair, Combination.ThreeOfAKind],
  },
  {
    hand: [
      { rank: '4', suit: 'spades' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [
      { rank: '6', suit: 'hearts' },
      { rank: '7', suit: 'clubs' },
      { rank: '8', suit: 'spades' },
      { rank: 'K', suit: 'clubs' },
    ],
    combinations: [Combination.Straight],
  },
  {
    hand: [
      { rank: '2', suit: 'spades' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [
      { rank: '6', suit: 'diamonds' },
      { rank: 'K', suit: 'diamonds' },
      { rank: '8', suit: 'diamonds' },
      { rank: 'J', suit: 'diamonds' },
    ],
    combinations: [Combination.Flush],
  },
  {
    hand: [
      { rank: '7', suit: 'hearts' },
      { rank: 'K', suit: 'clubs' },
    ],
    comm: [
      { rank: '7', suit: 'hearts' },
      { rank: '10', suit: 'clubs' },
      { rank: 'K', suit: 'spades' },
      { rank: '7', suit: 'clubs' },
    ],
    combinations: [Combination.Pair, Combination.TwoPair, Combination.ThreeOfAKind, Combination.FullHouse],
  },
  // {
  //   hand: [
  //     { rank: 'K', suit: 'hearts' },
  //     { rank: 'K', suit: 'clubs' },
  //   ],
  //   comm: [
  //     { rank: '7', suit: 'hearts' },
  //     { rank: '10', suit: 'clubs' },
  //     { rank: '7', suit: 'spades' },
  //     { rank: '7', suit: 'clubs' },
  //   ],
  //   combinations: [Combination.FullHouse],
  // },
  // {
  //   hand: [
  //     { rank: 'K', suit: 'hearts' },
  //     { rank: 'K', suit: 'clubs' },
  //   ],
  //   comm: [
  //     { rank: '7', suit: 'hearts' },
  //     { rank: '10', suit: 'clubs' },
  //     { rank: 'K', suit: 'spades' },
  //     { rank: '7', suit: 'clubs' },
  //   ],
  //   combinations: [Combination.FullHouse],
  // },
  {
    hand: [
      { rank: '5', suit: 'spades' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [
      { rank: '5', suit: 'hearts' },
      { rank: '10', suit: 'clubs' },
      { rank: '10', suit: 'spades' },
      { rank: '5', suit: 'clubs' },
    ],
    combinations: [Combination.Pair, Combination.ThreeOfAKind, Combination.FullHouse, Combination.FourOfAKind],
  },
  {
    hand: [
      { rank: '4', suit: 'diamonds' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [
      { rank: '6', suit: 'diamonds' },
      { rank: '7', suit: 'diamonds' },
      { rank: '8', suit: 'diamonds' },
      { rank: 'K', suit: 'clubs' },
    ],
    combinations: [Combination.Straight, Combination.Flush, Combination.StraightFlush],
  },
  {
    hand: [
      { rank: '2', suit: 'spades' },
      { rank: '10', suit: 'diamonds' },
    ],
    comm: [
      { rank: 'J', suit: 'diamonds' },
      { rank: 'K', suit: 'diamonds' },
      { rank: 'Q', suit: 'diamonds' },
      { rank: 'A', suit: 'diamonds' },
    ],
    combinations: [Combination.Straight, Combination.Flush, Combination.StraightFlush, Combination.RoyalFlush],
  },
  {
    hand: [
      { rank: '5', suit: 'hearts' },
      { rank: '6', suit: 'clubs' },
    ],
    comm: [
      { rank: '4', suit: 'hearts' },
      { rank: '9', suit: 'clubs' },
      { rank: 'A', suit: 'spades' },
      { rank: '7', suit: 'clubs' },
    ],
    combinations: [],
  },
  {
    hand: [
      { rank: '5', suit: 'hearts' },
      { rank: '6', suit: 'clubs' },
    ],
    comm: [
      { rank: '4', suit: 'hearts' },
      { rank: '8', suit: 'clubs' },
      { rank: 'A', suit: 'spades' },
      { rank: '7', suit: 'clubs' },
    ],
    combinations: [Combination.Straight],
  },
  {
    hand: [
      { rank: '5', suit: 'hearts' },
      { rank: 'J', suit: 'clubs' },
    ],
    comm: [
      { rank: '4', suit: 'hearts' },
      { rank: '8', suit: 'clubs' },
      { rank: '6', suit: 'spades' },
      { rank: '7', suit: 'clubs' },
    ],
    combinations: [Combination.Straight],
  },
];

cases.forEach(({ combinations, hand, comm }, i) =>
  it(`test #${i}`, () => expect(getCombinations(hand, comm)).toEqual(combinations)),
);
