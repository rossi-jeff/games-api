import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'src/**/*.schema.graphql',
	generates: {
		'generated/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				mappers: {
					HangMan: '../src/HangMan/types#HangManType',
				},
			},
		},
	},
}

export default config
