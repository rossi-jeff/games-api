import { Resolvers } from '../../generated/graphql'
import { db } from '../db'
import { HangManType } from './types'

export const getCorrect = (parent: HangManType) => {
	return parent.Correct ? parent.Correct.split(',') : []
}
export const getWrong = (parent: HangManType) => {
	return parent.Wrong ? parent.Wrong.split(',') : []
}

export const HangMan: Resolvers['HangMan'] = {
	Correct: getCorrect,
	Wrong: getWrong,
	Word: async (parent) => {
		return await db.client().word.findFirst({
			where: {
				Id: parent.WordId,
			},
		})
	},
}
