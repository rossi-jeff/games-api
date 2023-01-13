import { MutationUserCreateArgs } from "../../../generated/graphql";
import bcrypt from "bcrypt";
import { db } from "../../db";

export const createUser = async (args: MutationUserCreateArgs) => {
  const { UserName, PassWord } = args;
  const HashedPassWord = await bcrypt.hash(PassWord, 10);
  return await db.client().user.create({
    data: {
      UserName,
      HashedPassWord,
    },
  });
};
