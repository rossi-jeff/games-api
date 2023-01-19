import { QueryYachtArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const getYacht = async (args: QueryYachtArgs) => {
	const { Id } = args
	return await db.client().yacht.findFirst({
		where: {
			Id,
		},
	})
}
