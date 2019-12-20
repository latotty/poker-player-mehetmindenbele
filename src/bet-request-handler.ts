import { GameState } from './types';

export const handleBetRequestFactory: () => (_: GameState) => Promise<number> = () => async () => {
  return 0;
};
