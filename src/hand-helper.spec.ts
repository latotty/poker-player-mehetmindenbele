import 'jest';
import { Card } from './types';
import { isBadHand } from './hand-helper';

const cases: {
  hand: [Card, Card];
  badHand: boolean;
}[] = [
  {
    hand: [
      { rank: '2', suit: 'spades' },
      { rank: '7', suit: 'diamonds' },
    ],
    badHand: true,
  },
  {
    hand: [
      { rank: '6', suit: 'hearts' },
      { rank: '10', suit: 'clubs' },
    ],
    badHand: true,
  },
  {
    hand: [
      { rank: '8', suit: 'hearts' },
      { rank: '3', suit: 'clubs' },
    ],
    badHand: true,
  },
  {
    hand: [
      { rank: '2', suit: 'spades' },
      { rank: '10', suit: 'diamonds' },
    ],
    badHand: true,
  },
  {
    hand: [
      { rank: 'Q', suit: 'spades' },
      { rank: '2', suit: 'diamonds' },
    ],
    badHand: true,
  },
  {
    hand: [
      { rank: 'Q', suit: 'spades' },
      { rank: 'A', suit: 'diamonds' },
    ],
    badHand: false,
  },
  {
    hand: [
      { rank: 'A', suit: 'spades' },
      { rank: 'A', suit: 'diamonds' },
    ],
    badHand: false,
  },
  {
    hand: [
      { rank: 'J', suit: 'spades' },
      { rank: '9', suit: 'diamonds' },
    ],
    badHand: false,
  },
  {
    hand: [
      { rank: 'Q', suit: 'spades' },
      { rank: '10', suit: 'diamonds' },
    ],
    badHand: false,
  },
];

cases.forEach(({ hand, badHand }, i) => it(`test #${i}`, () => expect(isBadHand([hand[0], hand[1]])).toEqual(badHand)));
