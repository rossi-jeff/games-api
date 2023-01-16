import { db } from '../../db'

export const getSeaBattles = async () => {
	return await db.client().seaBattle.findMany()
}
