import 'jest';
import { checkCombinations } from './combinations-helper';

const cases: {
  score: number;
  hand: Parameters<typeof checkCombinations>[0];
  comm: Parameters<typeof checkCombinations>[1];
}[] = [
  {
    hand: [
      { rank: '5', suit: 'spades' },
      { rank: '5', suit: 'diamonds' },
    ],
    comm: [],
    score: 1,
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
    score: 1,
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
    score: 2,
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
    score: 3,
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
      { rank: '5', suit: 'clubs' },
    ],
    score: 4,
  },
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
    score: 7,
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
      { rank: '5', suit: 'clubs' },
    ],
    score: 8,
  },
];

cases.forEach(({ score, hand, comm }, i) =>
  it(`test #${i}`, () => expect(checkCombinations(hand, comm)).toEqual(score)),
);
