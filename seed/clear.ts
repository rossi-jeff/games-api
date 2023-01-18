import { db } from "../src/db";

const clear = async () => {
  await db.client().seaBattleTurnGridPoint.deleteMany({});
  await db.client().seaBattleShipGridPoint.deleteMany({});
  await db.client().seaBattleTurn.deleteMany({});
  await db.client().seaBattleShip.deleteMany({});
  await db.client().seaBattle.deleteMany({});
  await db.client().guessWordGuessRating.deleteMany({});
  await db.client().guessWordGuess.deleteMany({});
  await db.client().guessWord.deleteMany({});
  await db.client().hangMan.deleteMany({});
  await db.client().word.deleteMany({});
  await db.client().user.deleteMany({});
};

clear().then(() => console.log("data cleared"));
