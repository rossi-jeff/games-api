import { MutationCodeBreakerCreateArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { GameStatus } from '../../HangMan/types'

export const createCodeBreaker = async (
	args: MutationCodeBreakerCreateArgs
) => {
	const { Colors, Columns, UserId } = args
	const codeBreaker = await db.client().codeBreaker.create({
		data: {
			Status: GameStatus.Playing,
			Columns,
			UserId: UserId ?? undefined,
		},
	})
	for (let i = 0; i < Columns; i++) {
		await db.client().codeBreakerCode.create({
			data: {
				CodeBreakerId: codeBreaker.Id,
				Color: Colors[Math.floor(Math.random() * Colors.length)],
			},
		})
	}
	return codeBreaker
}
