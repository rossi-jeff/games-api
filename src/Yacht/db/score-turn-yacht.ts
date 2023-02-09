import { MutationYachtScoreTurnArgs } from '../../../generated/graphql'
import { db } from '../../db'
import {
	scoreBigStraight,
	scoreChoice,
	scoreFourKind,
	scoreFullHouse,
	scoreLittleStraight,
	scoreNumber,
	scoreYacht,
} from './roll-yacht'

export const getTotal = async (Id: number) => {
	const totals = await db.client().yachtTurn.findMany({
		where: {
			YachtId: Id,
			Score: {
				not: null,
			},
		},
		select: {
			Score: true,
		},
	})
	let total: number = 0
	totals.map((t) => (total += t.Score ?? 0))
	return total
}

export const scoreTurnYacht = async (args: MutationYachtScoreTurnArgs) => {
	const {
		Id,
		score: { Dice, Category },
	} = args
	let Score: number = 0
	if (!Category) throw new Error('Category is missing')

	switch (Category) {
		case 'Ones':
			Score = scoreNumber(Dice, 1)
			break
		case 'Twos':
			Score = scoreNumber(Dice, 2)
			break
		case 'Threes':
			Score = scoreNumber(Dice, 3)
			break
		case 'Fours':
			Score = scoreNumber(Dice, 4)
			break
		case 'Fives':
			Score = scoreNumber(Dice, 5)
			break
		case 'Sixes':
			Score = scoreNumber(Dice, 6)
			break
		case 'FullHouse':
			Score = scoreFullHouse(Dice)
			break
		case 'FourOfKind':
			Score = scoreFourKind(Dice)
			break
		case 'LittleStraight':
			Score = scoreLittleStraight(Dice)
			break
		case 'BigStraight':
			Score = scoreBigStraight(Dice)
			break
		case 'Choice':
			Score = scoreChoice(Dice)
			break
		case 'Yacht':
			Score = scoreYacht(Dice)
			break
	}

	const turn = await db.client().yachtTurn.update({
		where: {
			Id,
		},
		data: {
			Category,
			Score,
		},
	})

	const Total: number = await getTotal(turn.YachtId)

	await db.client().yacht.update({
		where: {
			Id: turn.YachtId,
		},
		data: {
			Total,
			NumTurns: {
				increment: 1,
			},
		},
	})

	return turn
}
