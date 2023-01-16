import { Resolvers } from '../../generated/graphql'
import { db } from '../db'

export const SeaBattle: Resolvers['SeaBattle'] = {
	User: async (parent) => {
		if (parent.UserId === null) return null
		return await db.client().user.findFirst({
			where: {
				Id: parent.UserId,
			},
		})
	},
	Ships: async (parent) => {
		return await db.client().seaBattleShip.findMany({
			where: {
				SeaBattleId: parent.Id,
			},
		})
	},
	Turns: async (parent) => {
		return await db.client().seaBattleTurn.findMany({
			where: {
				SeaBattleId: parent.Id,
			},
		})
	},
}
