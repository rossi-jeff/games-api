import { Resolvers } from "../generated/graphql";
import { gameCreate, gameUpdate } from "./Game/mutations";
import { games, game } from "./Game/queries";
import { userCreate, userUpdate, userChangePassWord } from "./User/mutations";
import { user } from "./User/queries";
import { word, wordRandom, wordRate, wordStats } from "./Word/queries";

export const resolvers: Resolvers = {
  Query: {
    games,
    game,
    user,
    word,
    wordRandom,
    wordStats,
    wordRate,
  },
  Mutation: {
    gameCreate,
    gameUpdate,
    userCreate,
    userUpdate,
    userChangePassWord,
  },
};
