import { QueryUserLoginArgs } from '../../../generated/graphql'
import { db } from '../../db'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

const secret = process.env.Sercet || 'S3cr3t!'

export const loginUser = async (args: QueryUserLoginArgs) => {
	const { UserName, PassWord } = args
	const existing = await db.client().user.findFirst({
		where: {
			UserName,
		},
	})
	if (!existing) throw new Error('Unable to authenticate')
	const valid = await bcrypt.compare(PassWord, existing.HashedPassWord)
	if (valid) {
		const Token = jwt.sign({ UserId: existing.Id, UserName }, secret, {
			expiresIn: '1h',
		})
		return { Token, UserName }
	} else {
		throw new Error('Unable to authenticate')
	}
}
