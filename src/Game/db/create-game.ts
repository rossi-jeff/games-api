import { MutationGameCreateArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const createGame = async (args: MutationGameCreateArgs) => {
  const { Name } = args;
  return await db.client().game.create({
    data: {
      Name,
    },
  });
};
