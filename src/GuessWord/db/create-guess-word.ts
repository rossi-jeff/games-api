import { MutationGuessWordCreateArgs } from "../../../generated/graphql";
import { db } from "../../db";
import { GameStatus } from "../../HangMan/types";

export const createGuessWord = async (
  args: MutationGuessWordCreateArgs,
  UserId?: number
) => {
  const { WordId } = args;
  return await db.client().guessWord.create({
    data: {
      WordId,
      Status: GameStatus.Playing,
      UserId: UserId ?? undefined,
    },
  });
};
