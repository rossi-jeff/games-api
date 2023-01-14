/*
  Warnings:

  - You are about to drop the column `Win` on the `HangMan` table. All the data in the column will be lost.
  - Added the required column `Status` to the `HangMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HangMan` DROP COLUMN `Win`,
    ADD COLUMN `Status` ENUM('Playing', 'Won', 'Lost') NOT NULL;
