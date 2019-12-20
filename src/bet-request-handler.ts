import { checkCombinations } from './combinations-helper';
import { GameState } from './types';

type Action = 'fold' | 'check' | 'raise' | 'allIn';

export const handleBetRequestFactory: () => (_: GameState) => number = () => gameState => {
  const ourPlayer = gameState.players[gameState.in_action];

  const combinationScore = checkCombinations(ourPlayer.hole_cards as any, gameState.community_cards as any);

  const action: Action = combinationScore > 2 ? 'allIn' : combinationScore > 1 ? 'raise' : 'check';

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
