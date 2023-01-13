import {
  QueryResolvers,
  QueryWordArgs,
  QueryWordRandomArgs,
} from "../../generated/graphql";
import { getWord } from "./db/get-word";
import { getWordStats } from "./db/get-word-stats";
import { randomWord } from "./db/random-word";

export const word: QueryResolvers["word"] = async (_, args: QueryWordArgs) => {
  return await getWord(args);
};

export const wordRandom: QueryResolvers["wordRandom"] = async (
  _,
  args: QueryWordRandomArgs
) => {
  return await randomWord(args);
};

export const wordStats: QueryResolvers["wordStats"] = async () => {
  return await getWordStats();
};
