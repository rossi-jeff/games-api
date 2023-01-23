import {
	QueryResolvers,
	QueryUserArgs,
	QueryUserLoginArgs,
} from '../../generated/graphql'
import { getUser } from './db/get-user'
import { loginUser } from './db/login-user'

export const user: QueryResolvers['user'] = async (_, args: QueryUserArgs) => {
	return await getUser(args)
}

export const userLogin: QueryResolvers['userLogin'] = async (
	_,
	args: QueryUserLoginArgs
) => {
	return await loginUser(args)
}
