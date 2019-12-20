import { GameState } from './types';

export const handleBetRequestFactory: () => (_: GameState) => Promise<number> = () => async gameState => {
  return (
    Math.max(0, gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise + 1) ||
    0
  );
};
