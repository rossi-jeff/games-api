import {
  MutationGameCreateArgs,
  MutationGameUpdateArgs,
  MutationResolvers,
} from "../../generated/graphql";
import { createGame } from "./db/create-game";
import { updateGame } from "./db/update-game";

export const gameCreate: MutationResolvers["gameCreate"] = async (
  _,
  args: MutationGameCreateArgs
) => {
  return await createGame(args);
};

export const gameUpdate: MutationResolvers["gameUpdate"] = async (
  _,
  args: MutationGameUpdateArgs
) => {
  return await updateGame(args);
};
