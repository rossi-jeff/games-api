import { QueryHangMenArgs } from '../../../generated/graphql'
import { buildQueryFilters } from '../../build-query-filters'
import { db } from '../../db'

export const getHangMen = async (args: QueryHangMenArgs) => {
	const { Skip, Take } = args
	const { skip, take } = buildQueryFilters({}, Skip, Take)
	const Items = await db.client().hangMan.findMany({
		orderBy: {
			Score: 'desc',
		},
		skip,
		take,
	})
	const Count = await db.client().hangMan.count()
	return { Items, Skip: skip, Take: take, Count }
}
