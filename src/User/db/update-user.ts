import { MutationUserUpdateArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const updateUser = async (args: MutationUserUpdateArgs) => {
  const { Id, UserName } = args;
  return await db.client().user.update({
    where: {
      Id,
    },
    data: {
      UserName,
    },
  });
};
