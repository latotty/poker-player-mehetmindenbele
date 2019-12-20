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
];

cases.forEach(({ score, hand, comm }, i) =>
  it(`test #${i}`, () => expect(checkCombinations(hand, comm)).toEqual(score)),
);
