import {
  MutationResolvers,
  MutationUserChangePassWordArgs,
  MutationUserCreateArgs,
  MutationUserUpdateArgs,
} from "../../generated/graphql";
import { changePassWord } from "./db/change-password";
import { createUser } from "./db/create-user";
import { updateUser } from "./db/update-user";

export const userCreate: MutationResolvers["userCreate"] = async (
  _,
  args: MutationUserCreateArgs
) => {
  return await createUser(args);
};

export const userUpdate: MutationResolvers["userUpdate"] = async (
  _,
  args: MutationUserUpdateArgs
) => {
  return await updateUser(args);
};

export const userChangePassWord: MutationResolvers["userChangePassWord"] =
  async (_, args: MutationUserChangePassWordArgs) => {
    return await changePassWord(args);
  };
