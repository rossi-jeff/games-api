import {
	MutationResolvers,
	MutationYachtCreateArgs,
	MutationYachtRollArgs,
	MutationYachtScoreTurnArgs,
} from '../../generated/graphql'
import { createYacht } from './db/create-yacht'
import { rollYacht } from './db/roll-yacht'
import { scoreTurnYacht } from './db/score-turn-yacht'

export const yachtCreate: MutationResolvers['yachtCreate'] = async (
	_,
	args: MutationYachtCreateArgs
) => {
	return await createYacht(args)
}

export const yachtRoll: MutationResolvers['yachtRoll'] = async (
	_,
	args: MutationYachtRollArgs
) => {
	return await rollYacht(args)
}

export const yachtScoreTurn: MutationResolvers['yachtScoreTurn'] = async (
	_,
	args: MutationYachtScoreTurnArgs
) => {
	return await scoreTurnYacht(args)
}
