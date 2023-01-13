import { db } from "../src/db";

const clear = async () => {
  await db.client().word.deleteMany({});
  await db.client().game.deleteMany({});
  await db.client().user.deleteMany({});
};

clear().then(() => console.log("data cleared"));
