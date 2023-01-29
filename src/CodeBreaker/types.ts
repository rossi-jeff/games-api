import {
	CodeBreaker,
	CodeBreakerGuess,
	CodeBreakerGuessColor,
	CodeBreakerGuessKey,
	CodeBreakerCode,
} from '../../generated/games-db'

export type CodeBreakerType = CodeBreaker

export type CodeBreakerGuessType = CodeBreakerGuess

export type CodeBreakerGuessColorType = CodeBreakerGuessColor

export type CodeBreakerGuessKeyType = CodeBreakerGuessKey

export type CodeBreakerCodeType = CodeBreakerCode

export enum Color {
	Black = 'Black',
	Blue = 'Blue',
	Brown = 'Brown',
	Green = 'Green',
	Orange = 'Orange',
	Purple = 'Purple',
	Red = 'Red',
	White = 'White',
	Yellow = 'Yellow',
}

export enum Key {
	Black = 'Black',
	White = 'White',
}
