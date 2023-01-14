import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const GuessWordGuess: Resolvers['GuessWordGuess'] = {
	Ratings: async (parent) => {
		return await db.client().guessWordGuessRating.findMany({
			where: {
				GuessWordGuessId: parent.Id,
			},
		})
	},
}
