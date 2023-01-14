import { MutationGuessWordGuessArgs, Rating } from '../../../generated/graphql'
import { db } from '../../db'
import { GameStatus } from '../../HangMan/types'

export const MaxGuesses = 10

export const getGuessWordStatus = (
	Guess: string,
	green: number[],
	count: number
) => {
	if (Guess.length === green.length) return GameStatus.Won
	if (count >= MaxGuesses) return GameStatus.Lost
	return GameStatus.Playing
}

export const rateGuessWordGuess = async (args: MutationGuessWordGuessArgs) => {
	const { Id, Guess } = args
	const existing = await db.client().guessWord.findFirst({
		where: {
			Id,
		},
		select: {
			Word: true,
		},
	})
	if (!existing) throw new Error('guess word not found')
	const word: string[] = existing.Word.Word.split('')
	const green: number[] = []
	const gray: number[] = []
	const brown: number[] = []
	for (let i = 0; i < Guess.length; i++) {
		if (word[i] && Guess[i] && word[i] === Guess[i]) {
			green.push(i)
		} else if (Guess[i] && !word.includes(Guess[i])) {
			gray.push(i)
		}
	}
	// remove green to prevent dupe browwn
	for (let i = word.length - 1; i >= 0; i--) {
		if (green.includes(i)) word.splice(i, 1)
	}
	for (let i = 0; i < Guess.length; i++) {
		if (!green.includes(i) && !gray.includes(i) && word.includes(Guess[i])) {
			brown.push(i)
		}
	}
	const guessWordGuess = await db.client().guessWordGuess.create({
		data: {
			GuessWordId: Id,
			Guess,
		},
	})
	const count = await db.client().guessWordGuess.count({
		where: {
			GuessWordId: Id,
		},
	})
	for (let i = 0; i < Guess.length; i++) {
		if (green.includes(i)) {
			await db.client().guessWordGuessRating.create({
				data: {
					GuessWordGuessId: guessWordGuess.Id,
					Rating: Rating.Green,
				},
			})
		} else if (brown.includes(i)) {
			await db.client().guessWordGuessRating.create({
				data: {
					GuessWordGuessId: guessWordGuess.Id,
					Rating: Rating.Brown,
				},
			})
		} else {
			await db.client().guessWordGuessRating.create({
				data: {
					GuessWordGuessId: guessWordGuess.Id,
					Rating: Rating.Gray,
				},
			})
		}
	}
	const Status: GameStatus = getGuessWordStatus(Guess, green, count)
	return await db.client().guessWord.update({
		where: {
			Id,
		},
		data: {
			Status,
		},
	})
}
