import { db } from "../../db";

export const createYacht = async (args: { UserId?: number }) => {
  const { UserId } = args;
  return await db.client().yacht.create({
    data: {
      UserId: UserId ?? undefined,
    },
  });
};
