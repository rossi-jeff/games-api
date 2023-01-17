import {
	SeaBattle,
	SeaBattleShip,
	SeaBattleTurn,
	SeaBattleShipGridPoint,
	SeaBattleTurnGridPoint,
} from '../../generated/games-db'

export type SeaBattleType = SeaBattle

export type SeaBattleShipType = SeaBattleShip

export type SeaBattleTurnType = SeaBattleTurn

export type SeaBattleShipGridPointType = SeaBattleShipGridPoint

export type SeaBattleTurnGridPointType = SeaBattleTurnGridPoint

export enum Navy {
	Opponent = 'Opponent',
	Player = 'Player',
}

export enum ShipType {
	BattleShip = 'BattleShip',
	Carrier = 'Carrier',
	Cruiser = 'Cruiser',
	PatrolBoat = 'PatrolBoat',
	SubMarine = 'SubMarine',
}

export enum Target {
	Hit = 'Hit',
	Miss = 'Miss',
	Sunk = 'Sunk',
}
