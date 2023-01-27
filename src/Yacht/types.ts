import { Yacht, YachtTurn } from '@prisma/client'

export type YachtType = Yacht

export type YachtTurnType = YachtTurn

export enum YachtCategory {
	BigStraight = 'BigStraight',
	Choice = 'Choice',
	Fives = 'Fives',
	FourOfKind = 'FourOfKind',
	Fours = 'Fours',
	FullHouse = 'FullHouse',
	LittleStraight = 'LittleStraight',
	Ones = 'Ones',
	Sixes = 'Sixes',
	Threes = 'Threes',
	Twos = 'Twos',
	Yacht = 'Yacht',
}
