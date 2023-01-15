import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const CodeBreakerGuess: Resolvers['CodeBreakerGuess'] = {
	Guess: async (parent) => {
		return await db.client().codeBreakerGuessColor.findMany({
			where: {
				CodeBreakerGuessId: parent.Id,
			},
		})
	},
	Keys: async (parent) => {
		return await db.client().codeBreakerGuessKey.findMany({
			where: {
				CodeBreakerGuessId: parent.Id,
			},
		})
	},
}
