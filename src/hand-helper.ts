import { Card } from './types';

type Rank = Card['rank'];

export const isBadHand = ([h1, h2]: Card[]): boolean =>
  unplayable.some(([c1, c2]) => (c1 === h1.rank && c2 === h2.rank) || (c1 === h2.rank && c2 === h1.rank));

export const isGoodHand = ([h1, h2]: Card[]): boolean =>
  goodHand.some(([c1, c2]) => (c1 === h1.rank && c2 === h2.rank) || (c1 === h2.rank && c2 === h1.rank));

export const unplayable: Rank[][] = [
  ['4', '3'],
  ['3', '2'],
  ['6', '4'],
  ['5', '3'],
  ['4', '2'],
  ['8', '5'],
  ['7', '4'],
  ['6', '3'],
  ['5', '2'],
  ['10', '6'],
  ['9', '5'],
  ['8', '4'],
  ['7', '3'],
  ['6', '2'],
  ['Q', '7'],
  ['J', '6'],
  ['10', '5'],
  ['9', '4'],
  ['8', '3'],
  ['7', '2'],
  ['Q', '6'],
  ['J', '5'],
  ['10', '4'],
  ['9', '3'],
  ['8', '2'],
  ['Q', '5'],
  ['J', '4'],
  ['10', '3'],
  ['9', '2'],
  ['Q', '4'],
  ['J', '3'],
  ['10', '2'],
  ['Q', '3'],
  ['J', '2'],
  ['Q', '2'],
];

export const goodHand: Rank[][] = [
  ['A', 'K'],
  ['A', 'Q'],
  ['A', 'J'],
  ['A', '10'],
  ['K', 'Q'],
  ['K', 'J'],
  ['K', '10'],
  ['Q', 'J'],
  ['Q', '10'],
  ['J', '10'],
  ['J', '9'],
  ['10', '9'],
];
