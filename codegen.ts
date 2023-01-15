import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'src/**/*.schema.graphql',
	generates: {
		'generated/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				mappers: {
					CodeBreaker: '../src/CodeBreaker/types#CodeBreakerType',
					CodeBreakerCode: '../src/CodeBreaker/types#CodeBreakerCodeType',
					CodeBreakerGuess: '../src/CodeBreaker/types#CodeBreakerGuessType',
					CodeBreakerGuessColor:
						'../src/CodeBreaker/types#CodeBreakerGuessColorType',
					CodeBreakerGuessKey:
						'../src/CodeBreaker/types#CodeBreakerGuessKeyType',
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
