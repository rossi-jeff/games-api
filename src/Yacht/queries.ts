import {
	QueryResolvers,
	QueryYachtArgs,
	QueryYachtsArgs,
} from '../../generated/graphql'
import { getYacht } from './db/get-yacht'
import { getYachts } from './db/get-yachts'

export const yachts: QueryResolvers['yachts'] = async (
	_,
	args: QueryYachtsArgs
) => {
	return await getYachts(args)
}

export const yacht: QueryResolvers['yacht'] = async (
	_,
	args: QueryYachtArgs
) => {
	return await getYacht(args)
}
