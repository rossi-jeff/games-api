import { MutationYachtCreateArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const createYacht = async (args: MutationYachtCreateArgs) => {
	const { UserId } = args
	return await db.client().yacht.create({
		data: {
			UserId: UserId ?? undefined,
		},
	})
}
