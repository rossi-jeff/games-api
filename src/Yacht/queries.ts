import { QueryResolvers, QueryYachtArgs } from '../../generated/graphql'
import { getYacht } from './db/get-yacht'
import { getYachts } from './db/get-yachts'

export const yachts: QueryResolvers['yachts'] = async () => {
	return await getYachts()
}

export const yacht: QueryResolvers['yacht'] = async (
	_,
	args: QueryYachtArgs
) => {
	return await getYacht(args)
}
