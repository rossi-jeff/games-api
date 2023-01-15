import { QueryCodeBreakerSolutionArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const getCodeBreakerSolution = async (
	args: QueryCodeBreakerSolutionArgs
) => {
	const { Id } = args
	return await db.client().codeBreakerCode.findMany({
		where: {
			CodeBreakerId: Id,
		},
		orderBy: {
			Id: 'asc',
		},
	})
}
