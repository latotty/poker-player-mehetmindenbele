import { GameState } from './types';

export const handleShowdownFactory: () => (_: GameState) => void = () => () => {
  console.log('showdown');
};
