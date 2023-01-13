import { db } from "../../db";

export const getWordStats = async () => {
  const stats: { Length: number; Count: number }[] = [];
  const min = await db.client().word.findFirst({
    orderBy: { Length: "asc" },
    select: { Length: true },
  });
  const max = await db.client().word.findFirst({
    orderBy: { Length: "desc" },
    select: { Length: true },
  });
  let Count: number;
  if (min && max) {
    for (let Length = min.Length; Length <= max.Length; Length++) {
      Count = await db.client().word.count({ where: { Length } });
      stats.push({ Length, Count });
    }
  }
  return stats;
};
