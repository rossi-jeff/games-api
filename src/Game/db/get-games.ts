import { db } from "../../db";

export const getGames = async () => {
  return await db.client().game.findMany();
};
