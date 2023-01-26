import { QueryCodeBreakersArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { buildQueryFilters } from '../../build-query-filters'

export const getCodeBreakers = async (args: QueryCodeBreakersArgs) => {
	const { Skip, Take, OrderBy } = args
	const { skip, take, orderBy } = buildQueryFilters(OrderBy, Skip, Take)
	const Items = await db.client().codeBreaker.findMany({
		orderBy,
		skip,
		take,
	})
	const Count = await db.client().codeBreaker.count()
	return { Items, OrderBy, Skip: skip, Take: take, Count }
}
