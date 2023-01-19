import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const Yacht: Resolvers['Yacht'] = {
	User: async (parent) => {
		if (parent.UserId === null) return null
		return await db.client().user.findFirst({
			where: {
				Id: parent.UserId,
			},
		})
	},
	Turns: async (parent) => {
		return await db.client().yachtTurn.findMany({
			where: {
				YachtId: parent.Id,
			},
			orderBy: {
				Id: 'asc',
			},
		})
	},
}
