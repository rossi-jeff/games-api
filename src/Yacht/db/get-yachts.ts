import { QueryYachtsArgs } from '../../../generated/graphql'
import { buildQueryFilters } from '../../build-query-filters'
import { db } from '../../db'

export const getYachts = async (args: QueryYachtsArgs) => {
	const { Skip, Take } = args
	const { skip, take } = buildQueryFilters({}, Skip, Take)
	const Items = await db.client().yacht.findMany({
		orderBy: {
			Total: 'desc',
		},
		skip,
		take,
	})
	const Count: number = await db.client().yacht.count()
	return { Items, Skip: skip, Take: take, Count }
}
