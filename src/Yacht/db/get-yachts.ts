import { db } from '../../db'

export const getYachts = async () => {
	return await db.client().yacht.findMany()
}
