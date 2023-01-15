import {
	MutationCodeBreakerCreateArgs,
	MutationCodeBreakerGuessArgs,
	MutationResolvers,
} from '../../generated/graphql'
import { createCodeBreaker } from './db/create-code-breaker'
import { rateCodeBreakerGuess } from './db/rate-code-breaker-guess'

export const codeBreakerCreate: MutationResolvers['codeBreakerCreate'] = async (
	_,
	args: MutationCodeBreakerCreateArgs
) => {
	return await createCodeBreaker(args)
}

export const codeBreakerGuess: MutationResolvers['codeBreakerGuess'] = async (
	_,
	args: MutationCodeBreakerGuessArgs
) => {
	return await rateCodeBreakerGuess(args)
}
