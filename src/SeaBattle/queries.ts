import { QueryResolvers, QuerySeaBattleArgs } from '../../generated/graphql'
import { getSeaBattle } from './db/get-sea-battle'
import { getSeaBattles } from './db/get-sea-battles'

export const seaBattles: QueryResolvers['seaBattles'] = async () => {
	return await getSeaBattles()
}

export const seaBattle: QueryResolvers['seaBattle'] = async (
	_,
	args: QuerySeaBattleArgs
) => {
	return await getSeaBattle(args)
}
