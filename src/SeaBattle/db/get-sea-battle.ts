import { QuerySeaBattleArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const getSeaBattle = async (args: QuerySeaBattleArgs) => {
	const { Id } = args
	return await db.client().seaBattle.findFirst({
		where: {
			Id,
		},
	})
}
