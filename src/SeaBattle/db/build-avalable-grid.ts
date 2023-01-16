const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const H = alphabet.toUpperCase().split('')

export const V = [...Array(26).keys()].map((x) => x + 1)

export const Directions = ['up', 'down', 'left', 'right']

export const buildAvailableGrid = (Axis: number) => {
	const grid: { Horizontal: string; Vertical: number }[] = []
	for (let v = 0; v < Axis; v++) {
		for (let h = 0; h < Axis; h++) {
			grid.push({ Horizontal: H[h], Vertical: V[v] })
		}
	}
	return grid
}
