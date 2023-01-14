import {
	MutationGuessWordCreateArgs,
	MutationGuessWordGuessArgs,
	MutationResolvers,
} from '../../generated/graphql'
import { createGuessWord } from './db/create-guess-word'
import { rateGuessWordGuess } from './db/rate-guess-word-guess'

export const guessWordCreate: MutationResolvers['guessWordCreate'] = async (
	_,
	args: MutationGuessWordCreateArgs
) => {
	return await createGuessWord(args)
}

export const guessWordGuess: MutationResolvers['guessWordGuess'] = async (
	_,
	args: MutationGuessWordGuessArgs
) => {
	return await rateGuessWordGuess(args)
}
