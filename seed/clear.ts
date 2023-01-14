import { db } from '../src/db'

const clear = async () => {
	await db.client().guessWordGuessRating.deleteMany({})
	await db.client().guessWordGuess.deleteMany({})
	await db.client().guessWord.deleteMany({})
	await db.client().hangMan.deleteMany({})
	await db.client().word.deleteMany({})
	await db.client().user.deleteMany({})
}

clear().then(() => console.log('data cleared'))
