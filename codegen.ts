import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'src/**/*.schema.graphql',
	generates: {
		'generated/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				mappers: {
					GuessWord: '../src/GuessWord/types#GuessWordType',
					GuessWordGuess: '../src/GuessWord/types#GuessWordGuessType',
					GuessWordGuessRating:
						'../src/GuessWord/types#GuessWordGuessRatingType',
					HangMan: '../src/HangMan/types#HangManType',
				},
			},
		},
	},
}

export default config
