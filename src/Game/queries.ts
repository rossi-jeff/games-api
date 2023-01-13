import { QueryGameArgs, QueryResolvers } from "../../generated/graphql";
import { getGame } from "./db/get-game";
import { getGames } from "./db/get-games";

export const games: QueryResolvers["games"] = async () => {
  return await getGames();
};

export const game: QueryResolvers["game"] = async (_, args: QueryGameArgs) => {
  return await getGame(args);
};
