import { MutationSeaBattleCreateArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const createSeaBattle = async (args: MutationSeaBattleCreateArgs) => {
	const { Axis, UserId } = args
	if (Axis > 26 || Axis < 6)
		throw new Error('Axis must be a number between 6 and 26')
	return await db.client().seaBattle.create({
		data: {
			Axis,
			UserId: UserId ?? undefined,
		},
	})
}
