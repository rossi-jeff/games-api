import { SeaBattleShip } from '../../../generated/games-db'
import { MutationSeaBattleTurnArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { Navy, ShipType, Target } from '../types'
import { buildAvailableGrid } from './build-avalable-grid'
import { setGameStatus } from './set-game-status'
import { GameStatus } from '../../../generated/games-db/index'

const getShipType = (ship: SeaBattleShip) => {
	switch (ship.Type) {
		case ShipType.BattleShip:
			return ShipType.BattleShip
		case ShipType.Carrier:
			return ShipType.Carrier
		case ShipType.Cruiser:
			return ShipType.Cruiser
		case ShipType.PatrolBoat:
			return ShipType.PatrolBoat
		case ShipType.SubMarine:
			return ShipType.SubMarine
		default:
			return undefined
	}
}

const perMiss = -5
const perHit = 10
const perSunk = 25

const calculateSeaBattleScore = async (Id: number) => {
	let Score: number = 0
	const missses = await db.client().seaBattleTurn.count({
		where: {
			SeaBattleId: Id,
			Navy: Navy.Player,
			Target: Target.Miss,
		},
	})
	Score += missses * perMiss
	const ships = await db.client().seaBattleShip.findMany({
		where: {
			SeaBattleId: Id,
		},
		include: {
			Hits: true,
		},
	})
	const playerShips = ships.filter((s) => s.Navy === Navy.Player)
	for (let ship of playerShips) {
		if (ship.Sunk) Score -= perSunk
		if (ship.Hits && ship.Hits.length) Score -= ship.Hits.length * perHit
	}
	const opponentShips = ships.filter((s) => s.Navy === Navy.Opponent)
	for (let ship of opponentShips) {
		if (ship.Sunk) Score += perSunk
		if (ship.Hits && ship.Hits.length) Score += ship.Hits.length * perHit
	}
	return await db.client().seaBattle.update({
		where: {
			Id,
		},
		data: {
			Score,
		},
	})
}

export const turnSeaBattle = async (args: MutationSeaBattleTurnArgs) => {
	const {
		Id,
		turn: { Navy, GridPoint },
	} = args

	const seaBattle = await db.client().seaBattle.findFirst({
		where: {
			Id,
		},
	})
	if (!seaBattle) throw new Error('Sea battle not found')

	const turns = await db.client().seaBattleTurn.findMany({
		where: {
			SeaBattleId: Id,
			Navy,
		},
		include: {
			GridPoint: true,
		},
	})

	const ships = await db.client().seaBattleShip.findMany({
		where: {
			SeaBattleId: Id,
			Navy: {
				not: Navy,
			},
		},
		include: {
			GridPoints: true,
		},
	})

	let grid = buildAvailableGrid(seaBattle.Axis)
	let idx: number
	for (let turn of turns) {
		for (let point of turn.GridPoint) {
			idx = grid.findIndex(
				(g) =>
					g.Horizontal === point.Horizontal && g.Vertical === point.Vertical
			)
			if (idx != -1) grid.splice(idx, 1)
		}
	}

	let target: Target | undefined = Target.Miss
	let shipType: ShipType | undefined = undefined
	let horizontal: string
	let vertical: number

	if (String(Navy) === 'Player') {
		if (!GridPoint || !GridPoint.Horizontal || !GridPoint.Vertical)
			throw new Error('Grid point is required')
		const { Horizontal, Vertical } = GridPoint
		let point = { Horizontal, Vertical }
		idx = grid.findIndex(
			(g) => g.Horizontal === point.Horizontal && g.Vertical === point.Vertical
		)
		if (idx === -1) throw new Error('Grid point has already been used')

		for (let ship of ships) {
			for (let gridPoint of ship.GridPoints) {
				if (
					point.Horizontal === gridPoint.Horizontal &&
					point.Vertical === gridPoint.Vertical
				) {
					await db.client().seaBattleShipHit.create({
						data: {
							SeaBattleShipId: ship.Id,
							Horizontal,
							Vertical,
						},
					})
					let hitCount = await db.client().seaBattleShipHit.count({
						where: {
							SeaBattleShipId: ship.Id,
						},
					})
					target = hitCount >= (ship.Size ?? 0) ? Target.Sunk : Target.Hit
					if (String(target) === 'Sunk') {
						await db.client().seaBattleShip.update({
							where: {
								Id: ship.Id,
							},
							data: {
								Sunk: true,
							},
						})
					}
					shipType = getShipType(ship)
				}
			}
		}
		horizontal = Horizontal
		vertical = Vertical
	} else {
		let point = grid[Math.floor(Math.random() * grid.length)]
		for (let ship of ships) {
			for (let gridPoint of ship.GridPoints) {
				if (
					point.Horizontal === gridPoint.Horizontal &&
					point.Vertical === gridPoint.Vertical
				) {
					await db.client().seaBattleShipHit.create({
						data: {
							SeaBattleShipId: ship.Id,
							Horizontal: point.Horizontal,
							Vertical: point.Vertical,
						},
					})
					let hitCount = await db.client().seaBattleShipHit.count({
						where: {
							SeaBattleShipId: ship.Id,
						},
					})
					target = hitCount >= (ship.Size ?? 0) ? Target.Sunk : Target.Hit
					if (String(target) === 'Sunk') {
						await db.client().seaBattleShip.update({
							where: {
								Id: ship.Id,
							},
							data: {
								Sunk: true,
							},
						})
					}
					shipType = getShipType(ship)
				}
			}
		}
		horizontal = point.Horizontal
		vertical = point.Vertical
	}
	const turn = await db.client().seaBattleTurn.create({
		data: {
			SeaBattleId: Id,
			Navy,
			Target: target,
			ShipType: shipType,
		},
	})
	await db.client().seaBattleTurnGridPoint.create({
		data: {
			SeaBattleTurnId: turn.Id,
			Horizontal: horizontal,
			Vertical: vertical,
		},
	})
	const updated = await setGameStatus(Id)
	if (updated && updated.Status != GameStatus.Playing)
		await calculateSeaBattleScore(Id)
	return turn
}
