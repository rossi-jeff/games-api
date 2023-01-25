import { QueryGuessWordsArgs } from '../../../generated/graphql'
import { buildQueryFilters } from '../../build-query-filters'
import { db } from '../../db'

export const getGuessWords = async (args: QueryGuessWordsArgs) => {
	const { Skip, Take } = args
	const { skip, take } = buildQueryFilters({}, Skip, Take)
	const Items = await db.client().guessWord.findMany({
		orderBy: {
			Score: 'desc',
		},
		skip,
		take,
	})
	const Count = await db.client().guessWord.count()
	return { Items, Skip: skip, Take: take, Count }
}
