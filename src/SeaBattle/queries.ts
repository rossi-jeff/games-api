import {
	QueryResolvers,
	QuerySeaBattleArgs,
	QuerySeaBattlesArgs,
} from '../../generated/graphql'
import { getSeaBattle } from './db/get-sea-battle'
import { getSeaBattles } from './db/get-sea-battles'

export const seaBattles: QueryResolvers['seaBattles'] = async (
	_,
	args: QuerySeaBattlesArgs
) => {
	return await getSeaBattles(args)
}

export const seaBattle: QueryResolvers['seaBattle'] = async (
	_,
	args: QuerySeaBattleArgs
) => {
	return await getSeaBattle(args)
}
