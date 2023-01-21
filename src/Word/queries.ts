import {
  QueryResolvers,
  QueryWordArgs,
  QueryWordHintsArgs,
  QueryWordRandomArgs,
  QueryWordRateArgs,
} from "../../generated/graphql";
import { getWord } from "./db/get-word";
import { getWordHints } from "./db/get-word-hints";
import { getWordStats } from "./db/get-word-stats";
import { randomWord } from "./db/random-word";
import { rateWord } from "./db/rate-word";

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

export const wordRate: QueryResolvers["wordRate"] = async (
  _,
  args: QueryWordRateArgs
) => {
  return await rateWord(args);
};

export const wordHints: QueryResolvers["wordHints"] = async (
  _,
  args: QueryWordHintsArgs
) => {
  return await getWordHints(args);
};
