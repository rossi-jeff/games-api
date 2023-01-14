import { Resolvers } from '../generated/graphql'
import { gameCreate, gameUpdate } from './Game/mutations'
import { games, game } from './Game/queries'
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

export const resolvers: Resolvers = {
	Query: {
		games,
		game,
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
		gameCreate,
		gameUpdate,
		guessWordCreate,
		guessWordGuess,
		hangManCreate,
		hangManGuess,
		userCreate,
		userUpdate,
		userChangePassWord,
	},
	GuessWord,
	GuessWordGuess,
	HangMan,
}
