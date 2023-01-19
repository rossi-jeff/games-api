import { Resolvers } from '../../generated/graphql'
import { YachtTurnType } from './types'

export const getRollOne = (parent: YachtTurnType) => {
	return parent.RollOne
		? parent.RollOne.split(',').map((d) => parseInt(d))
		: null
}

export const getRollTwo = (parent: YachtTurnType) => {
	return parent.RollTwo
		? parent.RollTwo.split(',').map((d) => parseInt(d))
		: null
}

export const getRollThree = (parent: YachtTurnType) => {
	return parent.RollThree
		? parent.RollThree.split(',').map((d) => parseInt(d))
		: null
}

export const YachtTurn: Resolvers['YachtTurn'] = {
	RollOne: getRollOne,
	RollTwo: getRollTwo,
	RollThree: getRollThree,
}
