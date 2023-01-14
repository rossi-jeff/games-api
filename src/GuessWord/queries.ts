import { QueryGuessWordArgs, QueryResolvers } from '../../generated/graphql'
import { getGuessWords } from './db/get-guess-words'
import { getGuessWord } from './db/get-guess-word'

export const guessWords: QueryResolvers['guessWords'] = async () => {
	return await getGuessWords()
}

export const guessWord: QueryResolvers['guessWord'] = async (
	_,
	args: QueryGuessWordArgs
) => {
	return await getGuessWord(args)
}
