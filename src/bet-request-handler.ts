import { getCombinations } from './combinations-helper';
import { GameState, Combination } from './types';
import { isBadHand } from './hand-helper';

type Action = 'fold' | 'check' | 'raise' | 'allIn';

const combinationScores: Record<Combination, number> = {
  [Combination.Pair]: 1,
  [Combination.TwoPair]: 2,
  [Combination.ThreeOfAKind]: 3,
  [Combination.Straight]: 4,
  [Combination.Flush]: 5,
  [Combination.FullHouse]: 6,
  [Combination.FourOfAKind]: 7,
  [Combination.StraightFlush]: 8,
  [Combination.RoyalFlush]: 9,
};
const getCombinationScore = (comb: Combination): number => combinationScores[comb];

export const handleBetRequestFactory: () => (_: GameState) => number = () => gameState => {
  const ourPlayer = gameState.players[gameState.in_action];

  const combinations = getCombinations(ourPlayer.hole_cards!, gameState.community_cards);

  const combinationScore = Math.max(0, ...combinations.map(c => getCombinationScore(c)));

  const isBadCards = isBadHand(ourPlayer.hole_cards!);

  const isBetTooHigh = gameState.current_buy_in >= 500;

  const action: Action =
    isBadCards || isBetTooHigh ? 'fold' : combinationScore >= 5 ? 'allIn' : combinationScore >= 2 ? 'raise' : 'check';

  const bet = getBet(gameState, action, combinationScore);

  console.log({ hand: ourPlayer.hole_cards, comm: gameState.community_cards, combinationScore, action, bet });

  return bet;
};

const getBet = (gameState: GameState, action: Action, combinationScore: number): number => {
  const ourPlayer = gameState.players[gameState.in_action];
  switch (action) {
    case 'raise': {
      return Math.max(0, gameState.current_buy_in - ourPlayer.bet + gameState.minimum_raise * combinationScore) || 0;
    }
    case 'check': {
      return Math.max(0, gameState.current_buy_in - ourPlayer.bet) || 0;
    }
    case 'allIn': {
      return ourPlayer.stack;
    }
    default:
      return 0;
  }
};
