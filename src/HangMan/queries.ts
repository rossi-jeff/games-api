import { QueryHangManArgs, QueryResolvers } from '../../generated/graphql'
import { getHangMan } from './db/get-hang-man'
import { getHangMen } from './db/get-hang-men'

export const hangMen: QueryResolvers['hangMen'] = async () => {
	return await getHangMen()
}

export const hangMan: QueryResolvers['hangMan'] = async (
	_,
	args: QueryHangManArgs
) => {
	return await getHangMan(args)
}
