import { QueryUserArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const getUser = async (args: QueryUserArgs) => {
  const { Id } = args;
  return await db.client().user.findFirst({
    where: {
      Id,
    },
  });
};
