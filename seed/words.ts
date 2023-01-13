import fs from "fs";
import { db } from "../src/db";

const fileToArray = (fileName: string) =>
  fs.readFileSync(fileName).toString("utf-8").split("\n");

const wordList = fileToArray("seed/usa2.txt");

let count = 0;
let max = 0;

const parseList = async () => {
  for (let Word of wordList) {
    if (Word.length < 4) continue;
    if (Word.length > max) max = Word.length;
    await db.client().word.create({
      data: {
        Word,
        Length: Word.length,
      },
    });
    count++;
    if (count % 1000 === 0) console.log(`${count} words added`);
  }
};

parseList().then(() => console.log(`${count} words added, ${max} length`));
