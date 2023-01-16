import {
	MutationResolvers,
	MutationSeaBattleCreateArgs,
	MutationSeaBattleShipArgs,
} from '../../generated/graphql'
import { createSeaBattle } from './db/create-sea-battle'
import { addSeaBattleShip } from './db/add-sea-battle-ship'

export const seaBattleCreate: MutationResolvers['seaBattleCreate'] = async (
	_,
	args: MutationSeaBattleCreateArgs
) => {
	return await createSeaBattle(args)
}

export const seaBattleShip: MutationResolvers['seaBattleShip'] = async (
	_,
	args: MutationSeaBattleShipArgs
) => {
	return await addSeaBattleShip(args)
}
