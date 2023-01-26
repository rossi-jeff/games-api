import { MutationGuessWordGuessArgs, Rating } from '../../../generated/graphql'
import { db } from '../../db'
import { GameStatus } from '../../HangMan/types'

const perLetter: number = 25
const perGuess: number = -30
const perGreen: number = 10
const perBrown: number = 5
const perGray: number = -5

export const calculateGuessWordScore = async (Id: number, length: number) => {
	let Score: number = length * perLetter
	const guesses = await db.client().guessWordGuess.findMany({
		where: {
			GuessWordId: Id,
		},
		include: {
			Ratings: true,
		},
	})
	for (let guess of guesses) {
		Score += perGuess
		for (let rating of guess.Ratings) {
			switch (rating.Rating) {
				case Rating.Green:
					Score += perGreen
					break
				case Rating.Brown:
					Score += perBrown
					break
				case Rating.Gray:
					Score += perGray
					break
			}
		}
	}
	return await db.client().guessWord.update({
		where: {
			Id,
		},
		data: {
			Score,
		},
	})
}

export const getGuessWordStatus = (
	Guess: string,
	green: number[],
	count: number,
	wordLength: number
) => {
	const MaxGuesses: number = Math.ceil((wordLength * 3) / 2)
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
	const { Word, Length } = existing.Word
	const word: string[] = Word.split('')
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
	const Status: GameStatus = getGuessWordStatus(Guess, green, count, Length)
	if (Status != GameStatus.Playing) await calculateGuessWordScore(Id, Length)
	return await db.client().guessWord.update({
		where: {
			Id,
		},
		data: {
			Status,
		},
	})
}
