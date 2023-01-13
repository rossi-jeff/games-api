import {
  QueryResolvers,
  QueryWordArgs,
  QueryWordRandomArgs,
} from "../../generated/graphql";
import { getWord } from "./db/get-word";
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
