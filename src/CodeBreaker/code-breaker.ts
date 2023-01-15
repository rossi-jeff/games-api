import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const CodeBreaker: Resolvers['CodeBreaker'] = {
	User: async (parent) => {
		if (parent.UserId === null) return null
		return await db.client().user.findFirst({
			where: {
				Id: parent.UserId,
			},
		})
	},
	Guesses: async (parent) => {
		return await db.client().codeBreakerGuess.findMany({
			where: {
				CodeBreakerId: parent.Id,
			},
		})
	},
}
