import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const SeaBattleTurn: Resolvers['SeaBattleTurn'] = {
	GridPoint: async (parent) => {
		return await db.client().seaBattleTurnGridPoint.findFirst({
			where: {
				SeaBattleTurnId: parent.Id,
			},
		})
	},
}
