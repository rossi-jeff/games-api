import {
  MutationResolvers,
  MutationYachtRollArgs,
  MutationYachtScoreTurnArgs,
} from "../../generated/graphql";
import { decodeToken } from "../decode-token";
import { createYacht } from "./db/create-yacht";
import { rollYacht } from "./db/roll-yacht";
import { scoreTurnYacht } from "./db/score-turn-yacht";

export const yachtCreate: MutationResolvers["yachtCreate"] = async (
  _,
  __,
  context
) => {
  const { token } = context;
  const { UserId } = decodeToken(token);
  return await createYacht({ UserId });
};

export const yachtRoll: MutationResolvers["yachtRoll"] = async (
  _,
  args: MutationYachtRollArgs
) => {
  return await rollYacht(args);
};

export const yachtScoreTurn: MutationResolvers["yachtScoreTurn"] = async (
  _,
  args: MutationYachtScoreTurnArgs
) => {
  return await scoreTurnYacht(args);
};
