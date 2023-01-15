import { db } from '../../db'

export const getCodeBreakers = async () => {
	return await db.client().codeBreaker.findMany()
}
