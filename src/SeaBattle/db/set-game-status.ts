import { db } from '../../db'
import { Navy } from '../types'
import { GameStatus } from '../../HangMan/types'
export const setGameStatus = async (Id: number) => {
	let ships = await db.client().seaBattleShip.findMany({
		where: {
			SeaBattleId: Id,
		},
	})
	let playerShips = ships.filter((s) => s.Navy === Navy.Player)
	let playerSunk = playerShips.filter((s) => s.Sunk === true)
	let opponentShips = ships.filter((s) => s.Navy === Navy.Opponent)
	let opponentSunk = opponentShips.filter((s) => s.Sunk === true)
	if (opponentSunk.length === opponentShips.length) {
		return await db.client().seaBattle.update({
			where: {
				Id,
			},
			data: {
				Status: GameStatus.Won,
			},
		})
	}
	if (playerSunk.length === playerShips.length) {
		return await db.client().seaBattle.update({
			where: {
				Id,
			},
			data: {
				Status: GameStatus.Lost,
			},
		})
	}
	// should be Playing, do nothing
	return null
}
