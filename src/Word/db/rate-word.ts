import { QueryWordRateArgs, Word } from "../../../generated/graphql";
import { db } from "../../db";
import { Rating } from "../types";

export const rateWord = async (args: QueryWordRateArgs) => {
  const { Id, Guess } = args;
  const Ratings: Rating[] = [];
  const found = await db.client().word.findFirst({
    where: {
      Id,
    },
    select: {
      Word: true,
    },
  });
  if (!found) throw new Error("Word not found");
  const { Word } = found;
  let W: string, G: string;
  for (let i = 0; i < Word.length; i++) {
    W = Word[i];
    G = Guess[i];
    if (W && G && W === G) {
      Ratings.push(Rating.Green);
    } else if (G && Word.includes(G)) {
      Ratings.push(Rating.Brown);
    } else {
      Ratings.push(Rating.Gray);
    }
  }
  return { Id, Guess, Ratings };
};
