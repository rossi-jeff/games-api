import { MutationHangManCreateArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { GameStatus } from '../types'

export const createHangMan = async (args: MutationHangManCreateArgs) => {
	const { WordId, UserId } = args
	return await db.client().hangMan.create({
		data: {
			WordId,
			Correct: '',
			Wrong: '',
			Status: GameStatus.Playing,
			UserId: UserId ?? undefined,
		},
	})
}
