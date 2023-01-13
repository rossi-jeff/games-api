import { QueryWordRandomArgs } from "../../../generated/graphql";
import { db } from "../../db";

export const randomWord = async (args: QueryWordRandomArgs) => {
  const Length = args.filter?.Length ?? undefined;
  const Min = args.filter?.Min ?? undefined;
  const Max = args.filter?.Max ?? undefined;
  let where = {};
  if (Length) {
    where = { Length };
  } else if (Min && Max) {
    where = { Length: { gte: Min, lte: Max } };
  } else if (Min) {
    where = { Length: { gte: Min } };
  } else if (Max) {
    where = { Length: { lte: Max } };
  }
  const total = await db.client().word.count({ where });
  const skip = Math.floor(Math.random() * total);
  return await db.client().word.findFirst({
    where,
    orderBy: { Word: "asc" },
    skip,
  });
};
