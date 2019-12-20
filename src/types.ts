export interface GameState {
  tournament_id: string;
  game_id: string;
  round: number;
  bet_index: number;
  small_blind: number;
  current_buy_in: number;
  pot: number;
  minimum_raise: number;
  dealer: number;
  orbits: number;
  in_action: number;
  players: Player[];
  community_cards: Holecard[];
}
export interface Player {
  id: number;
  name: string;
  status: string;
  version: string;
  stack: number;
  bet: number;
  hole_cards?: Holecard[];
}
export interface Holecard {
  rank: string;
  suit: string;
}