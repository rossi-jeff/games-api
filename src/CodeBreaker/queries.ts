import {
	QueryCodeBreakerArgs,
	QueryCodeBreakersArgs,
	QueryCodeBreakerSolutionArgs,
	QueryResolvers,
} from '../../generated/graphql'
import { getCodeBreakerSolution } from './db/get-code-breaker-solution'
import { getCodeBreakers } from './db/get-code-breakers'
import { getCodeBreaker } from './db/get-code-breaker'

export const codeBreakers: QueryResolvers['codeBreakers'] = async (
	_,
	args: QueryCodeBreakersArgs
) => {
	return await getCodeBreakers(args)
}

export const codeBreaker: QueryResolvers['codeBreaker'] = async (
	_,
	args: QueryCodeBreakerArgs
) => {
	return await getCodeBreaker(args)
}

export const codeBreakerSolution: QueryResolvers['codeBreakerSolution'] =
	async (_, args: QueryCodeBreakerSolutionArgs) => {
		return await getCodeBreakerSolution(args)
	}
