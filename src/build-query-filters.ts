type OrderByItem = { [key: string]: string }

const defaultSkip: number = 0

const defaultTake: number = 10

type FilterResult = {
	orderBy: OrderByItem[]
	skip: number
	take: number
}

export const buildQueryFilters = (
	OrderBy?: object | null,
	Skip?: number | null,
	Take?: number | null
) => {
	let result: FilterResult = {
		orderBy: [],
		skip: Skip || defaultSkip,
		take: Take || defaultTake,
	}
	if (OrderBy) {
		for (const [key, value] of Object.entries(OrderBy)) {
			result.orderBy?.push({ [key]: String(value).toLowerCase() })
		}
	}
	return result
}
