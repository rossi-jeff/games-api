import { QueryWordArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const getWord = async (args: QueryWordArgs) => {
  const { Id } = args;
  return await db.client().word.findFirst({
    where: {
      Id,
    },
  });
};
