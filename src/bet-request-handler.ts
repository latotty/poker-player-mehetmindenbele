import { GameState } from './types';

export const handleBetRequestFactory: () => (_: GameState) => Promise<number> = () => async ({
  current_buy_in,
  players,
  in_action,
  bet_index,
  minimum_raise,
}) => {
  return Math.abs(current_buy_in - players[in_action][bet_index] + minimum_raise + 1);
};
