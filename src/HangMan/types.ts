import { HangMan } from '@prisma/client'

export type HangManType = HangMan

export enum GameStatus {
	Playing = 'Playing',
	Won = 'Won',
	Lost = 'Lost',
}
