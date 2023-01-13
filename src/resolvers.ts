import { Resolvers } from "../generated/graphql";
import { gameCreate, gameUpdate } from "./Game/mutations";
import { games, game } from "./Game/queries";
import { userCreate, userUpdate, userChangePassWord } from "./User/mutations";
import { user } from "./User/queries";

export const resolvers: Resolvers = {
  Query: {
    games,
    game,
    user,
  },
  Mutation: {
    gameCreate,
    gameUpdate,
    userCreate,
    userUpdate,
    userChangePassWord,
  },
};
