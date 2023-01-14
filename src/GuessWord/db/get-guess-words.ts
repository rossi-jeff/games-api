import { db } from '../../db'

export const getGuessWords = async () => {
	return await db.client().guessWord.findMany()
}
