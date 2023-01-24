import {
  MutationGuessWordCreateArgs,
  MutationGuessWordGuessArgs,
  MutationResolvers,
} from "../../generated/graphql";
import { decodeToken } from "../decode-token";
import { createGuessWord } from "./db/create-guess-word";
import { rateGuessWordGuess } from "./db/rate-guess-word-guess";

export const guessWordCreate: MutationResolvers["guessWordCreate"] = async (
  _,
  args: MutationGuessWordCreateArgs,
  context
) => {
  const { token } = context;
  const { UserId } = decodeToken(token);
  return await createGuessWord(args, UserId);
};

export const guessWordGuess: MutationResolvers["guessWordGuess"] = async (
  _,
  args: MutationGuessWordGuessArgs
) => {
  return await rateGuessWordGuess(args);
};
