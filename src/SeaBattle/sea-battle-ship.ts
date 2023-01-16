import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const SeaBattleShip: Resolvers['SeaBattleShip'] = {
	GridPoints: async (parent) => {
		return await db.client().seaBattleShipGridPoint.findMany({
			where: {
				SeaBattleShipId: parent.Id,
			},
		})
	},
}
