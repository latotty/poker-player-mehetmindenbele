import { GameState } from './types';

export const handleShowdownFactory: () => (_: GameState) => Promise<void> = () => async () => {};
