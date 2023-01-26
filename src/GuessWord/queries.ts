import {
	QueryGuessWordArgs,
	QueryGuessWordsArgs,
	QueryResolvers,
} from '../../generated/graphql'
import { getGuessWords } from './db/get-guess-words'
import { getGuessWord } from './db/get-guess-word'

export const guessWords: QueryResolvers['guessWords'] = async (
	_,
	args: QueryGuessWordsArgs
) => {
	return await getGuessWords(args)
}

export const guessWord: QueryResolvers['guessWord'] = async (
	_,
	args: QueryGuessWordArgs
) => {
	return await getGuessWord(args)
}
