import {
  MutationResolvers,
  MutationSeaBattleCreateArgs,
  MutationSeaBattleShipArgs,
  MutationSeaBattleTurnArgs,
} from "../../generated/graphql";
import { createSeaBattle } from "./db/create-sea-battle";
import { addSeaBattleShip } from "./db/add-sea-battle-ship";
import { turnSeaBattle } from "./db/turn-sea-battle";

export const seaBattleCreate: MutationResolvers["seaBattleCreate"] = async (
  _,
  args: MutationSeaBattleCreateArgs
) => {
  return await createSeaBattle(args);
};

export const seaBattleShip: MutationResolvers["seaBattleShip"] = async (
  _,
  args: MutationSeaBattleShipArgs
) => {
  return await addSeaBattleShip(args);
};

export const seaBattleTurn: MutationResolvers["seaBattleTurn"] = async (
  _,
  args: MutationSeaBattleTurnArgs
) => {
  return await turnSeaBattle(args);
};
