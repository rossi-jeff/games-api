import { MutationUserChangePassWordArgs } from "../../../generated/graphql";
import { db } from "../../db";
import bcrypt from "bcrypt";

export const changePassWord = async (args: MutationUserChangePassWordArgs) => {
  const { UserName, OldPassWord, NewPassWord } = args;
  const existing = await db.client().user.findFirst({
    where: {
      UserName,
    },
  });
  if (!existing) throw new Error("Unable to change password");
  const valid = await bcrypt.compare(OldPassWord, existing.HashedPassWord);
  if (valid) {
    const { Id } = existing;
    const HashedPassWord = await bcrypt.hash(NewPassWord, 10);
    return await db.client().user.update({
      where: {
        Id,
      },
      data: {
        HashedPassWord,
      },
    });
  } else {
    throw new Error("Unable to change password");
  }
};
