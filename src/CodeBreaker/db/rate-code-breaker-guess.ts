import { MutationCodeBreakerGuessArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { GameStatus } from '../../HangMan/types'
import { Color, Key } from '../types'

export const MaxTurns = 12

export const codeBreakerStatus = (
	Colors: Color[],
	black: number[],
	count: number
) => {
	if (Colors.length === black.length) return GameStatus.Won
	if (count >= MaxTurns) return GameStatus.Lost
	return GameStatus.Playing
}

export const rateCodeBreakerGuess = async (
	args: MutationCodeBreakerGuessArgs
) => {
	const { Id, Colors } = args
	const existing = await db.client().codeBreakerCode.findMany({
		where: {
			CodeBreakerId: Id,
		},
		orderBy: {
			Id: 'asc',
		},
		select: {
			Color: true,
		},
	})
	const code = existing.map((c) => c.Color)
	if (code.length != Colors.length) throw new Error('Incorrect guess length')
	let black: number[] = []
	let white: number[] = []
	let idx: number
	for (let i = 0; i < Colors.length; i++) {
		if (Colors[i] === code[i]) black.push(i)
	}
	for (let i = Colors.length - 1; i >= 0; i--) {
		if (black.includes(i)) code.splice(i, 1)
	}
	for (let i = 0; i < Colors.length; i++) {
		if (code.includes(Colors[i]) && !black.includes(i)) {
			white.push(i)
			idx = code.indexOf(Colors[i])
			code.splice(idx, 1)
		}
	}
	const codeBreakerGuess = await db.client().codeBreakerGuess.create({
		data: {
			CodeBreakerId: Id,
		},
	})
	for (let Color of Colors) {
		await db.client().codeBreakerGuessColor.create({
			data: {
				CodeBreakerGuessId: codeBreakerGuess.Id,
				Color,
			},
		})
	}
	for (let i = 0; i < black.length; i++) {
		await db.client().codeBreakerGuessKey.create({
			data: {
				CodeBreakerGuessId: codeBreakerGuess.Id,
				Key: Key.Black,
			},
		})
	}
	for (let i = 0; i < white.length; i++) {
		await db.client().codeBreakerGuessKey.create({
			data: {
				CodeBreakerGuessId: codeBreakerGuess.Id,
				Key: Key.White,
			},
		})
	}
	const count = await db.client().codeBreakerGuess.count({
		where: {
			CodeBreakerId: Id,
		},
	})
	const Status: GameStatus = codeBreakerStatus(Colors, black, count)
	await db.client().codeBreaker.update({
		where: {
			Id,
		},
		data: {
			Status,
		},
	})
	return await db.client().codeBreakerGuess.findFirst({
		where: {
			Id: codeBreakerGuess.Id,
		},
	})
}
