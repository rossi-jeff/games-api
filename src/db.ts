import { PrismaClient } from "../generated/games-db";

const client = new PrismaClient();

export const db = {
  client: () => client,
};
