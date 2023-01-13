import { QueryGameArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const getGame = async (args: QueryGameArgs) => {
  const { Id } = args;
  return await db.client().game.findFirst({
    where: {
      Id,
    },
  });
};
