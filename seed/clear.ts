import { db } from "../src/db";

const clear = async () => {
  await db.client().codeBreakerGuessKey.deleteMany({});
  await db.client().codeBreakerGuessColor.deleteMany({});
  await db.client().codeBreakerGuess.deleteMany({});
  await db.client().codeBreakerCode.deleteMany({});
  await db.client().codeBreaker.deleteMany({});
  await db.client().yachtTurn.deleteMany({});
  await db.client().yacht.deleteMany({});
  await db.client().seaBattleTurnGridPoint.deleteMany({});
  await db.client().seaBattleShipGridPoint.deleteMany({});
  await db.client().seaBattleShipHit.deleteMany({});
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
