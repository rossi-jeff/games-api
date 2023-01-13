import { MutationGameUpdateArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const updateGame = async (args: MutationGameUpdateArgs) => {
  const { Id, Name } = args;
  return await db.client().game.update({
    where: {
      Id,
    },
    data: {
      Name,
    },
  });
};
