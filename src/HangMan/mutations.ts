import {
	MutationHangManCreateArgs,
	MutationHangManGuessArgs,
	MutationResolvers,
} from '../../generated/graphql'
import { createHangMan } from './db/create-hang-man'
import { guessHangMan } from './db/guess-hang-man'

export const hangManCreate: MutationResolvers['hangManCreate'] = async (
	_,
	args: MutationHangManCreateArgs
) => {
	return await createHangMan(args)
}

export const hangManGuess: MutationResolvers['hangManGuess'] = async (
	_,
	args: MutationHangManGuessArgs
) => {
	return await guessHangMan(args)
}
