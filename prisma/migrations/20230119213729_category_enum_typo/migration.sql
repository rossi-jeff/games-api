/*
  Warnings:

  - The values [Sizes] on the enum `YachtTurn_Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `YachtTurn` MODIFY `Category` ENUM('Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'FullHouse', 'FourOfKind', 'LittleStraight', 'BigStraight', 'Choice', 'Yacht') NULL;
