import { Resolvers } from '../generated/graphql'
import { gameCreate, gameUpdate } from './Game/mutations'
import { games, game } from './Game/queries'
import { hangManCreate, hangManGuess } from './HangMan/mutations'
import { hangMen, hangMan } from './HangMan/queries'
import { HangMan } from './HangMan/hangman'
import { userCreate, userUpdate, userChangePassWord } from './User/mutations'
import { user } from './User/queries'
import { word, wordRandom, wordRate, wordStats } from './Word/queries'

export const resolvers: Resolvers = {
	Query: {
		games,
		game,
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
		hangManCreate,
		hangManGuess,
		userCreate,
		userUpdate,
		userChangePassWord,
	},
	HangMan,
}
