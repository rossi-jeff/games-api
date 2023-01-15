import { QueryCodeBreakerArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const getCodeBreaker = async (args: QueryCodeBreakerArgs) => {
	const { Id } = args
	return await db.client().codeBreaker.findFirst({
		where: {
			Id,
		},
	})
}
