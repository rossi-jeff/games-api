import {
	MutationResolvers,
	MutationUserChangePassWordArgs,
	MutationUserRegisterArgs,
	MutationUserUpdateArgs,
} from '../../generated/graphql'
import { changePassWord } from './db/change-password'
import { createUser } from './db/create-user'
import { updateUser } from './db/update-user'

export const userRegister: MutationResolvers['userRegister'] = async (
	_,
	args: MutationUserRegisterArgs
) => {
	return await createUser(args)
}

export const userUpdate: MutationResolvers['userUpdate'] = async (
	_,
	args: MutationUserUpdateArgs
) => {
	return await updateUser(args)
}

export const userChangePassWord: MutationResolvers['userChangePassWord'] =
	async (_, args: MutationUserChangePassWordArgs) => {
		return await changePassWord(args)
	}
