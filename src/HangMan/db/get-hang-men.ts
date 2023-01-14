import { db } from '../../db'

export const getHangMen = async () => {
	return await db.client().hangMan.findMany()
}
