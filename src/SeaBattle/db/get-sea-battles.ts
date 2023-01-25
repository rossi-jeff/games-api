import { QuerySeaBattlesArgs } from '../../../generated/graphql'
import { buildQueryFilters } from '../../build-query-filters'
import { db } from '../../db'

export const getSeaBattles = async (args: QuerySeaBattlesArgs) => {
	const { Skip, Take } = args
	const { skip, take } = buildQueryFilters({}, Skip, Take)
	const Items = await db.client().seaBattle.findMany({
		orderBy: {
			Score: 'desc',
		},
		skip,
		take,
	})
	const Count: number = await db.client().seaBattle.count()
	return { Items, Skip: skip, Take: take, Count }
}
