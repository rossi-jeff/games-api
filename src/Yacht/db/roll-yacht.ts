import {
	MutationYachtRollArgs,
	YachScoreOption,
} from '../../../generated/graphql'
import { db } from '../../db'
import { YachtCategory } from '../types'

export const rollDie = (size: number = 6) => {
	return Math.ceil(Math.random() * size)
}

export const scoreNumber = (dice: number[], number: number) => {
	let score: number = 0
	for (let die of dice) {
		if (die === number) score += number
	}
	return score
}

export const countDieFaces = (dice: number[]) => {
	let faces: { [key: number]: number } = {}
	for (let die of dice) {
		if (!faces[die]) faces[die] = 0
		faces[die]++
	}
	return faces
}

export const scoreFullHouse = (dice: number[]) => {
	let faces: { [key: number]: number } = countDieFaces(dice)
	let score: number = 0
	let values = Object.values(faces)
	if (values.length === 2 && values.includes(2) && values.includes(3))
		score = 25
	return score
}

export const scoreYacht = (dice: number[]) => {
	let faces: { [key: number]: number } = countDieFaces(dice)
	let score: number = 0
	let values = Object.values(faces)
	if (values.length === 1 && values.includes(5)) score = 50
	return score
}

export const scoreLittleStraight = (dice: number[]) => {
	let score: number = 0
	let sorted = JSON.parse(JSON.stringify(dice))
	sorted.sort()
	if (sorted.join(',') === '1,2,3,4,5') score = 30
	return score
}

export const scoreBigStraight = (dice: number[]) => {
	let score: number = 0
	let sorted = JSON.parse(JSON.stringify(dice))
	sorted.sort()
	if (sorted.join(',') === '2,3,4,5,6') score = 30
	return score
}

export const scoreChoice = (dice: number[]) => {
	let score: number = 0
	for (let die of dice) score += die
	return score
}

export const scoreFourKind = (dice: number[]) => {
	let faces: { [key: number]: number } = countDieFaces(dice)
	let score: number = 0
	let values = Object.values(faces)
	let keys = Object.keys(faces)
	if (values.includes(4) || values.includes(5)) {
		for (let key of keys) {
			if (faces[parseInt(key)] >= 4) score = 4 * parseInt(key)
		}
	}
	return score
}

export const sortByScore = (a: YachScoreOption, b: YachScoreOption) =>
	(b.Score ?? 0) - (a.Score ?? 0)

export const rollYacht = async (args: MutationYachtRollArgs) => {
	const {
		Id,
		roll: { Keep },
	} = args
	let Options: YachScoreOption[] = []
	let Turn
	const lastTurn = await db.client().yachtTurn.findFirst({
		where: {
			YachtId: Id,
		},
		orderBy: {
			Id: 'desc',
		},
	})
	let Dice: number[] = typeof Keep === 'object' && Keep?.length ? [...Keep] : []
	const TurnCategories = await db.client().yachtTurn.findMany({
		where: {
			YachtId: Id,
			Category: {
				not: null,
			},
		},
		select: {
			Category: true,
		},
	})
	while (Dice.length < 5) {
		Dice.push(rollDie())
	}
	const Categories = Object.values(YachtCategory)
	let idx: number
	for (let Category of Categories) {
		let option: YachScoreOption = { Category }
		switch (Category) {
			case 'Ones':
				option.Score = scoreNumber(Dice, 1)
				break
			case 'Twos':
				option.Score = scoreNumber(Dice, 2)
				break
			case 'Threes':
				option.Score = scoreNumber(Dice, 3)
				break
			case 'Fours':
				option.Score = scoreNumber(Dice, 4)
				break
			case 'Fives':
				option.Score = scoreNumber(Dice, 5)
				break
			case 'Sixes':
				option.Score = scoreNumber(Dice, 6)
				break
			case 'FullHouse':
				option.Score = scoreFullHouse(Dice)
				break
			case 'FourOfKind':
				option.Score = scoreFourKind(Dice)
				break
			case 'LittleStraight':
				option.Score = scoreLittleStraight(Dice)
				break
			case 'BigStraight':
				option.Score = scoreBigStraight(Dice)
				break
			case 'Choice':
				option.Score = scoreChoice(Dice)
				break
			case 'Yacht':
				option.Score = scoreYacht(Dice)
				break
		}
		idx = TurnCategories.findIndex((c) => c.Category === Category)
		if (idx == -1) Options.push(option)
	}

	if (
		!lastTurn ||
		(lastTurn && lastTurn.RollThree != null) ||
		(lastTurn && lastTurn.Category != null)
	) {
		Turn = await db.client().yachtTurn.create({
			data: {
				YachtId: Id,
				RollOne: Dice.join(','),
			},
		})
	} else {
		if (lastTurn.RollTwo) {
			Turn = await db.client().yachtTurn.update({
				where: {
					Id: lastTurn.Id,
				},
				data: {
					RollThree: Dice.join(','),
				},
			})
		} else if (lastTurn.RollOne) {
			Turn = await db.client().yachtTurn.update({
				where: {
					Id: lastTurn.Id,
				},
				data: {
					RollTwo: Dice.join(','),
				},
			})
		}
	}

	Options.sort(sortByScore)

	return { Options, Turn }
}
