import { QueryHangManArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const getHangMan = async (args: QueryHangManArgs) => {
	const { Id } = args
	return await db.client().hangMan.findFirst({
		where: {
			Id,
		},
	})
}
