import { MutationHangManGuessArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { GameStatus } from '../types'

export const arrayIntersect = (a: string[], b: string[]) => {
	var setB = new Set(b)
	return [...new Set(a)].filter((x) => setB.has(x))
}

export const hangManStatus = (
	word: string,
	correct: string[],
	wrong: string[]
) => {
	const letters = [...new Set(word.split(''))]
	const intersect = arrayIntersect(letters, correct)
	if (wrong.length === 6) {
		return GameStatus.Lost
	} else if (letters.length === intersect.length) {
		return GameStatus.Won
	} else {
		return GameStatus.Playing
	}
}

export const guessHangMan = async (args: MutationHangManGuessArgs) => {
	const { Id, Guess } = args
	const existing = await db.client().hangMan.findFirst({
		where: {
			Id,
		},
		select: {
			Correct: true,
			Wrong: true,
			Word: true,
		},
	})
	if (!existing) throw new Error('Hangman not found')
	const { Word, Correct: CorrectStr, Wrong: WrongStr } = existing
	const CorrectArr: string[] = CorrectStr.split(',')
	const WrongArr: string[] = WrongStr.split(',')
	let Found: boolean = false
	if (Word.Word.includes(Guess)) {
		Found = true
		CorrectArr.push(Guess)
	} else {
		WrongArr.push(Guess)
	}
	const Status: GameStatus = hangManStatus(Word.Word, CorrectArr, WrongArr)
	const hangMan = await db.client().hangMan.update({
		where: {
			Id,
		},
		data: {
			Correct: CorrectArr.join(','),
			Wrong: WrongArr.join(','),
			Status,
		},
	})
	return {
		hangMan,
		Guess,
		Found,
		Status,
	}
}
