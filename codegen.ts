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
					SeaBattle: '../src/SeaBattle/types#SeaBattleType',
					SeaBattleShip: '../src/SeaBattle/types#SeaBattleShipType',
					SeaBattleTurn: '../src/SeaBattle/types#SeaBattleTurnType',
					SeaBattleShipGridPoint:
						'../src/SeaBattle/types#SeaBattleShipGridPointType',
					SeaBattleTurnGridPoint:
						'../src/SeaBattle/types#SeaBattleTurnGridPointType',
					SeaBattleShipHit: '../src/SeaBattle/types#SeaBattleShipHitType',
					Yacht: '../src/Yacht/types#YachtType',
					YachtTurn: '../src/Yacht/types#YachtTurnType',
				},
			},
		},
	},
}

export default config
