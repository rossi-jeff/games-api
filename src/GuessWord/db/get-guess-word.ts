import { QueryGuessWordArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const getGuessWord = async (args: QueryGuessWordArgs) => {
	const { Id } = args
	return await db.client().guessWord.findFirst({
		where: {
			Id,
		},
	})
}
