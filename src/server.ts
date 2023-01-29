import { loadFiles } from '@graphql-tools/load-files'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { resolvers } from './resolvers'

const startServer = async () => {
	const typeDefs = await loadFiles('./**/*.schema.graphql')
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			const token = req.headers.authorization || ''
			return { token }
		},
		cache: 'bounded',
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	})
	server.listen().then(({ url }) => {
		console.log(`server started at ${url} `)
		console.log(process.env.DATABASE_URL)
	})
}

startServer()
