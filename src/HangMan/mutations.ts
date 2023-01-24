import {
  MutationHangManCreateArgs,
  MutationHangManGuessArgs,
  MutationResolvers,
} from "../../generated/graphql";
import { decodeToken } from "../decode-token";
import { createHangMan } from "./db/create-hang-man";
import { guessHangMan } from "./db/guess-hang-man";

export const hangManCreate: MutationResolvers["hangManCreate"] = async (
  _,
  args: MutationHangManCreateArgs,
  context
) => {
  const { token } = context;
  const { UserId } = decodeToken(token);
  return await createHangMan(args, UserId);
};

export const hangManGuess: MutationResolvers["hangManGuess"] = async (
  _,
  args: MutationHangManGuessArgs
) => {
  return await guessHangMan(args);
};
