import { GameState } from './types';

export const handleBetRequestFactory: () => (_: GameState) => Promise<number> = () => async gameState => {
  const ourPlayer = gameState.players[gameState.in_action];

  return Math.max(0, gameState.current_buy_in - ourPlayer.bet + gameState.minimum_raise + 1) || 0;
};
