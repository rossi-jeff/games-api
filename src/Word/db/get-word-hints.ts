import { QueryWordHintsArgs } from '../../../generated/graphql'
import { db } from '../../db'

export const matchGray = (word: string, gray: string[]) => {
	if (!gray || !gray.length) return false
	for (let letter of gray) {
		if (letter && word.includes(letter)) return true
	}
	return false
}

type stringOrNull = string | null

export const notMatchGreen = (word: string, green: stringOrNull[]) => {
	for (let i = 0; i < word.length; i++) {
		if (green[i]) {
			if (green[i] != word[i]) return true
		}
	}
	return false
}

type arrayOrNull = string[] | null

export const matchBrown = (word: string, brown?: arrayOrNull[]) => {
	if (!brown) return false
	let letter: string
	for (let i = 0; i < word.length; i++) {
		if (brown[i] && brown[i]?.length) {
			letter = word[i]
			if (brown[i]?.includes(letter)) return true
		}
	}
	return false
}

export const getWordHints = async (args: QueryWordHintsArgs) => {
	const { Length, Green, Gray, Brown } = args.filter
	const results = await db.client().word.findMany({
		where: {
			Length,
		},
		select: {
			Word: true,
		},
	})
	const words: string[] = results.map((r) => r.Word)
	const Hints: string[] = []
	for (let word of words) {
		if (Gray && matchGray(word, Gray)) continue
		if (Green && notMatchGreen(word, Green)) continue
		if (Brown && matchBrown(word, Brown)) continue
		Hints.push(word)
	}
	return { Hints }
}
