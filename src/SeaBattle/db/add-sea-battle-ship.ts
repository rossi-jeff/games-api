import { MutationSeaBattleShipArgs } from '../../../generated/graphql'
import { db } from '../../db'
import { ShipType } from '../types'
import { buildAvailableGrid, Directions, H, V } from './build-avalable-grid'

const sizes = {
	[ShipType.Carrier]: 5,
	[ShipType.BattleShip]: 4,
	[ShipType.Cruiser]: 3,
	[ShipType.SubMarine]: 3,
	[ShipType.PatrolBoat]: 2,
}

export const addSeaBattleShip = async (args: MutationSeaBattleShipArgs) => {
	const {
		Id,
		ship: { Navy, Type, GridPoints },
	} = args

	const seaBattle = await db.client().seaBattle.findFirst({
		where: {
			Id,
		},
	})
	if (!seaBattle) throw new Error('Sea battle not found')

	const ships = await db.client().seaBattleShip.findMany({
		where: {
			SeaBattleId: Id,
			Navy,
		},
		include: {
			GridPoints: true,
		},
	})

	let grid = buildAvailableGrid(seaBattle.Axis)

	let idx: number
	for (let ship of ships) {
		for (let gridPoint of ship.GridPoints) {
			const { Horizontal, Vertical } = gridPoint
			if (!Horizontal || !Vertical) continue
			idx = grid.indexOf({ Horizontal, Vertical })
			if (idx > -1) grid.splice(idx, 1)
		}
	}

	let valid: boolean,
		idxV: number,
		idxH: number,
		points: { Horizontal: string; Vertical: number }[] = [],
		start: { Horizontal: string; Vertical: number },
		point: { Horizontal: string; Vertical: number },
		directions: string[],
		direction: string,
		Size: number = sizes[Type]

	if (String(Navy) === 'Player') {
		valid = GridPoints ? true : false
		if (GridPoints) {
			for (let p of GridPoints) {
				if (!p || !p.Horizontal || !p.Vertical) {
					valid = false
					continue
				}
				const { Horizontal, Vertical } = p
				point = { Horizontal, Vertical }
				idx = grid.findIndex(
					(g) =>
						g.Horizontal === point.Horizontal && g.Vertical === point.Vertical
				)
				if (idx == -1) valid = false
			}
		}
		if (!valid) throw new Error('Invalid grid points for ship')
		const ship = await db.client().seaBattleShip.create({
			data: {
				SeaBattleId: Id,
				Navy,
				Type,
				Size,
			},
		})
		if (GridPoints) {
			for (let p of GridPoints) {
				if (!p || !p.Horizontal || !p.Vertical)
					throw new Error('Invalid grid points for ship')
				const { Horizontal, Vertical } = p
				await db.client().seaBattleShipGridPoint.create({
					data: {
						SeaBattleShipId: ship.Id,
						Horizontal,
						Vertical,
					},
				})
			}
		}
		return ship
	} else {
		valid = false
		while (!valid) {
			points = []
			start = grid[Math.floor(Math.random() * grid.length)]
			idxH = H.indexOf(start.Horizontal)
			idxV = V.indexOf(start.Vertical)
			valid = true

			directions = []
			if (idxH >= Size) directions.push('left')
			if (idxH <= 25 - Size) directions.push('right')
			if (idxV >= Size) directions.push('up')
			if (idxV <= 25 - Size) directions.push('down')
			direction = directions[Math.floor(Math.random() * directions.length)]

			for (let s = 0; s < Size; s++) {
				if (!V[idxV] || !H[idxH]) {
					valid = false
					break
				}
				point = {
					Horizontal: H[idxH],
					Vertical: V[idxV],
				}
				idx = grid.findIndex(
					(g) =>
						g.Horizontal === point.Horizontal && g.Vertical === point.Vertical
				)
				if (idx == -1) {
					valid = false
					break
				}
				points.push(point)
				switch (direction) {
					case 'up':
						idxV--
						break
					case 'down':
						idxV++
						break
					case 'left':
						idxH--
						break
					case 'right':
						idxH++
						break
				}
			}

			if (points.length != Size) valid = false
		}

		// should have valid array of grid points here
		const ship = await db.client().seaBattleShip.create({
			data: {
				SeaBattleId: Id,
				Navy,
				Type,
				Size,
			},
		})
		for (let p of points) {
			const { Horizontal, Vertical } = p
			await db.client().seaBattleShipGridPoint.create({
				data: {
					SeaBattleShipId: ship.Id,
					Horizontal,
					Vertical,
				},
			})
		}
		return ship
	}
}
