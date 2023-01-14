import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const GuessWord: Resolvers['GuessWord'] = {
	Guesses: async (parent) => {
		return await db.client().guessWordGuess.findMany({
			where: {
				GuessWordId: parent.Id,
			},
		})
	},
	Word: async (parent) => {
		return await db.client().word.findFirst({
			where: {
				Id: parent.WordId,
			},
		})
	},
	User: async (parent) => {
		if (parent.UserId === null) return null
		return await db.client().user.findFirst({
			where: {
				Id: parent.UserId,
			},
		})
	},
}
