import { Resolvers } from "../generated/graphql";
import { gameCreate, gameUpdate } from "./Game/mutations";
import { games, game } from "./Game/queries";

export const resolvers: Resolvers = {
  Query: {
    games,
    game,
  },
  Mutation: {
    gameCreate,
    gameUpdate,
  },
};
