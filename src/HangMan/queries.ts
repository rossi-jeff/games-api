import {
	QueryHangManArgs,
	QueryHangMenArgs,
	QueryResolvers,
} from '../../generated/graphql'
import { getHangMan } from './db/get-hang-man'
import { getHangMen } from './db/get-hang-men'

export const hangMen: QueryResolvers['hangMen'] = async (
	_,
	args: QueryHangMenArgs
) => {
	return await getHangMen(args)
}

export const hangMan: QueryResolvers['hangMan'] = async (
	_,
	args: QueryHangManArgs
) => {
	return await getHangMan(args)
}
