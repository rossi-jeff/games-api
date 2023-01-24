import {
  MutationCodeBreakerCreateArgs,
  MutationCodeBreakerGuessArgs,
  MutationResolvers,
} from "../../generated/graphql";
import { decodeToken } from "../decode-token";
import { createCodeBreaker } from "./db/create-code-breaker";
import { rateCodeBreakerGuess } from "./db/rate-code-breaker-guess";

export const codeBreakerCreate: MutationResolvers["codeBreakerCreate"] = async (
  _,
  args: MutationCodeBreakerCreateArgs,
  context
) => {
  const { token } = context;
  const { UserId } = decodeToken(token);
  return await createCodeBreaker(args, UserId);
};

export const codeBreakerGuess: MutationResolvers["codeBreakerGuess"] = async (
  _,
  args: MutationCodeBreakerGuessArgs
) => {
  return await rateCodeBreakerGuess(args);
};
