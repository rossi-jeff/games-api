import { HangMan } from '../../generated/games-db'

export type HangManType = HangMan

export enum GameStatus {
	Playing = 'Playing',
	Won = 'Won',
	Lost = 'Lost',
}
