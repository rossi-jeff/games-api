import { Resolvers } from '../generated/graphql'
import { hangManCreate, hangManGuess } from './HangMan/mutations'
import { hangMen, hangMan } from './HangMan/queries'
import { HangMan } from './HangMan/hangman'
import { userCreate, userUpdate, userChangePassWord } from './User/mutations'
import { user } from './User/queries'
import { word, wordRandom, wordRate, wordStats } from './Word/queries'
import { guessWords, guessWord } from './GuessWord/queries'
import { guessWordCreate, guessWordGuess } from './GuessWord/mutations'
import { GuessWord } from './GuessWord/guess-word'
import { GuessWordGuess } from './GuessWord/guess-word-guess'
import { codeBreakerCreate, codeBreakerGuess } from './CodeBreaker/mutations'
import { CodeBreaker } from './CodeBreaker/code-breaker'
import { CodeBreakerGuess } from './CodeBreaker/code-breaker-guess'
import {
	codeBreaker,
	codeBreakers,
	codeBreakerSolution,
} from './CodeBreaker/queries'

export const resolvers: Resolvers = {
	Query: {
		codeBreakers,
		codeBreaker,
		codeBreakerSolution,
		guessWords,
		guessWord,
		hangMen,
		hangMan,
		user,
		word,
		wordRandom,
		wordStats,
		wordRate,
	},
	Mutation: {
		codeBreakerCreate,
		codeBreakerGuess,
		guessWordCreate,
		guessWordGuess,
		hangManCreate,
		hangManGuess,
		userCreate,
		userUpdate,
		userChangePassWord,
	},
	CodeBreaker,
	CodeBreakerGuess,
	GuessWord,
	GuessWordGuess,
	HangMan,
}
